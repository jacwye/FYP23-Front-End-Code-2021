// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import sgMail from '@sendgrid/mail';
import * as functions from 'firebase-functions';
import { firebaseApp } from '../firebase';
import { getUserFromEmail } from '../helper/firebaseInteractions';

const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
const firestore = firebaseApp.firestore();

sgMail.setApiKey(SENDGRID_API_KEY || process.env.SENDGRID_API_KEY);

/**
 * Notifys the users that are subscribed to a machine that a sensor has breached
 * its threshold.
 * @param threshold The threshold value
 * @param recordedValue The recorded value over the threshold
 * @param sensorId The sensor id of the sensor that has breached threshold
 * @param machineId The machine id of the machine that has the sensor
 */
export async function notifyUsers(
  threshold: number,
  recordedValue: number,
  sensorId: string,
  machineId: string
) {
  const sensorRef = firestore
    .collection(`machines/${machineId}/sensors`)
    .doc(sensorId);
  const sensorDoc = await sensorRef.get();
  const sensor = sensorDoc.data();

  const machineRef = firestore.collection(`machines`).doc(machineId);
  const machineDoc = await machineRef.get();
  const machine = machineDoc.data();

  const notificationMessage: any = {
    notification: {
      title: `Sensor: ${sensor?.name} Threshold Breached`,
      body: `Sensor '${sensor?.name}' on machine '${machine?.name} has crossed its threshold. Threshold Value: ${threshold}. Recorded Value: ${recordedValue}'`,
    },
    data: { machineId: machineId, sensorId: sensorId },
  };

  if (machine) {
    notificationMessage.tokens = await getRegistrationTokens(machine);
  }

  if (notificationMessage.tokens.length > 0) {
    firebaseApp.messaging().sendMulticast(notificationMessage);
  }

  if (machine && machine.notificationStatus == 'Unacknowledged') {
    const senderEmail = 'industry4errornotification@gmail.com';
    const subject = 'Error detected with Machine ' + machine!.name;
    const html =
      'Sensor ' +
      sensor?.name +
      ' on machine ' +
      machine!.name +
      ' has crossed its threshold.<br/>' +
      'Threshold: ' +
      threshold +
      '<br/>' +
      'Recorded Value: ' +
      recordedValue +
      '<br/>' +
      '<a href="https://cms-uoa.web.app/machine/"' +
      machineId +
      '>Click here to view the error</a>';

    if (machine != undefined && machine != null) {
      machine.subscribers.forEach((email) => {
        const receiverEmail = email;
        const msg = {
          to: receiverEmail,
          from: senderEmail,
          subject: subject,
          html: html,
        };

        sgMail.send(msg);
      });
    }
  }
}

/**
 * Called by the CRON job that is being run every hour. Checks whether a machines
 * notification status is still unacknowledged and notifys the subscribed users.
 */
export async function updateUsers() {
  const notifyDictionary = {};
  const machinesRef = firestore.collection(`machines`);
  const machines = await machinesRef.get();
  if (machines) {
    machines.forEach((machine) => {
      if (machine.data().notificationStatus == 'Unacknowledged') {
        machine.data().subscribers.forEach((email) => {
          if (email in notifyDictionary) {
            notifyDictionary[email] = [
              ...notifyDictionary[email],
              machine.data().name,
            ];
          } else {
            notifyDictionary[email] = [machine.data().name];
          }
        });
      }
    });
  }

  const senderEmail = 'industry4errornotification@gmail.com';

  for (const email in notifyDictionary) {
    if (Object.prototype.hasOwnProperty.call(notifyDictionary, email)) {
      const receiverEmail = email;
      let emailMsg =
        'Issues have been detected with the following machines:<br/>';
      notifyDictionary[email].forEach((machine) => {
        emailMsg += 'Machine ' + machine + '<br/>';
      });
      emailMsg +=
        'Please acknowledge and resolve these issues within the industry 4.0 application. <br/>';
      emailMsg +=
        '<a href="https://cms-uoa.web.app/machine/">Click here to visit the application</a>';

      const msg = {
        to: receiverEmail,
        from: senderEmail,
        subject: 'You have machine(s) with unacknowledged issues',
        html: emailMsg,
      };

      sgMail.send(msg);
    }
  }
}

/**
 * Get the registration tokens (if there are) for all of the users
 * subscribed to a specific machine
 * @param machine The machine which has a sensor that has breached
 * the threshold
 */
const getRegistrationTokens = async (machine) => {
  const registrationTokens: string[] = [];
  const notificationSubscribers = machine.subscribers;

  for (const subscriberEmail of notificationSubscribers) {
    const user = await getUserFromEmail(subscriberEmail);
    if (user) {
      if (user.androidAppId) {
        registrationTokens.push(user.androidAppId);
      }
    }
  }

  return registrationTokens;
};
