import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {
  addUser,
  getUserFromEmail,
  updateAndroidAppId,
} from '../helper/firebaseInteractions';
import {
  checkMachineAndSensor,
  processDataFromRequestBody,
  MachineAndSensorFoundResponse,
} from './ingestor';

/**
 * The server which handles HTTP requests made to the '/ingestor' path.
 * The server is created using the 'express' library. It allows the use
 * of middlewares such as parsers which can parse the body of an HTTP
 * request into the relevant objects.
 */
export function ConstructIngestorServer() {
  const app = express();
  app.use(cors());
  app.options('*');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Function that gets called when a POST request gets made to the
  // URL on the next line. This function handles the processing of
  // the request where RMS data is posted for a particular sensor.
  app.post(
    '/machine/:machineId/sensor/:sensorId',
    async (req: express.Request, res: express.Response) => {
      if (
        !req.headers['content-type'] ||
        req.headers['content-type'] != 'application/json'
      ) {
        res.status(400).send("Content-Type should be 'application/json'");
        return;
      }

      if (!req.params.machineId) {
        res.status(400).send('No machineId provided');
        return;
      }

      if (!req.params.sensorId) {
        res.status(400).send('No sensorId provided');
        return;
      }

      if (!req.body) {
        res.status(400).send('No data provided in body of the POST request');
        return;
      }

      try {
        processDataFromRequestBody(
          req.params.machineId,
          req.params.sensorId,
          req.body.timestamp,
          req.body.value
        );
        res.sendStatus(201);
      } catch (error) {
        res.sendStatus(500);
      }
    }
  );

  // Function that gets called when a GET request gets made to the
  // URL on the next line. This function checks whether a particular
  // machine and sensor are available in the database.
  app.get(
    `/machine/:machineId/sensor/:sensorId`,
    async (req: express.Request, res: express.Response) => {
      if (!req.params.machineId) {
        res.status(400).send('No machineId provided');
        return;
      }

      if (!req.params.sensorId) {
        res.status(400).send('No sensorId provided');
        return;
      }

      try {
        const data: MachineAndSensorFoundResponse = await checkMachineAndSensor(
          req.params.machineId,
          req.params.sensorId
        );
        if (data.machine == 'FOUND' && data.sensor == 'FOUND') {
          res.status(200).send();
          return;
        } else {
          res.status(404).send(data);
        }
      } catch (error) {
        res.sendStatus(500);
      }
    }
  );

  // Function that gets called when a POST request gets made to the
  // URL on the next line. This function handles the processing of
  // the request where a user email is posted to get stored in the
  // database.
  app.post(
    '/userEmail',
    async (req: express.Request, res: express.Response) => {
      if (!req.body) {
        res.status(400).send('No data provided in body of the POST request');
        return;
      }

      try {
        const userData = await getUserFromEmail(req.body.email);
        if (!userData) {
          await addUser(req.body.email);
          res.sendStatus(201);
        } else {
          res.sendStatus(200);
        }
      } catch (error) {
        res.sendStatus(500);
      }
    }
  );

  // Function that gets called when a POST request gets made to the
  // URL on the next line. This function handles the processing of
  // the request where the registration token from the android app
  // for a user is posted.
  app.post(
    '/androidAppFcm',
    async (req: express.Request, res: express.Response) => {
      if (!req.body) {
        res.status(400).send('No data provided in body of the POST request');
        return;
      }

      try {
        await updateAndroidAppId(req.body.email, req.body.appId);
        res.sendStatus(201);
      } catch (error) {
        res.sendStatus(500);
      }
    }
  );

  return app;
}
