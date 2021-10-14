import cors from 'cors';
import express from 'express';
import { generateSensorDataCSV } from './handlers';

/**
 * The server which handles HTTP requests made to the '/download' path.
 * The server is created using the 'express' library. It allows the use
 * of middlewares such as parsers which can parse the body of an HTTP
 * request into the relevant objects.
 */
export function ConstructFileDownloadServer() {
  const app = express();
  app.use(cors());
  app.options('*');

  /**
   * Process GET requests made for downloading the sensor data as a CSV file
   */
  app.get('/machine/:machineId/sensor/:sensorId', async (req, res) => {
    if (!req.params.sensorId) {
      res.status(400).send('No sensorId provided');
      return;
    }
    if (!req.params.machineId) {
      res.status(400).send('No machineId provided');
      return;
    }

    const data = await generateSensorDataCSV(
      req.params.machineId,
      req.params.sensorId
    );

    res
      .set({
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="sensorData.csv"',
      })
      .send(data);
  });

  return app;
}
