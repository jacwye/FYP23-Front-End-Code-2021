import moment from 'moment';
import { firebaseApp, Timestamp } from '../firebase';
import { addIdToDoc } from '../graphql/resolvers/utils';

const firestore = firebaseApp.firestore();

/**
 * Interface for SensorData based the schema.
 */
interface SensorData {
  timestamp: FirebaseFirestore.Timestamp;
  value: number;
}

/**
 * Retrives the threshold value for a particular sensor stored
 * in firestore.
 * @param machineId The machineId which has the sensor
 * @param sensorId The sensorId for the sensor
 */
export async function getThresholdValueForSensor(
  machineId: string,
  sensorId: string
) {
  let thresholdValue: any;
  const sensorRef = firestore
    .collection(`machines/${machineId}/sensors/`)
    .doc(sensorId);
  const doc = await sensorRef.get();
  if (doc.exists) {
    thresholdValue = doc.get('threshold');
  }
  return thresholdValue;
}

/**
 * Adds a 'SensorData' collection containing the RMS value and timestamp
 * to a particular sensor in the firestore.
 * @param value The RMS value that needs to be stored
 * @param timestamp The time the RMS value was calculated on the engine
 * @param machineId The machineId which contains the sensor
 * @param sensorId The sensorId for the sensor
 */
export async function addRMSValueToSensor(
  value: number,
  timestamp: string,
  machineId: string,
  sensorId: string
) {
  const sensorData: SensorData = {
    timestamp: Timestamp.fromDate(moment(timestamp).toDate()),
    value: value,
  };

  await firestore
    .collection(`machines/${machineId}/sensors/${sensorId}/sensorData`)
    .doc(`${timestamp}`)
    .set(sensorData);
}

/**
 * Updates the notification status for a machine.
 * @param machineId The machineId for which the notification status needs
 * to be updated
 */
export async function updateMachineNotificationStatus(machineId: string) {
  await firestore.collection(`machines`).doc(machineId).update({
    notificationStatus: 'Unacknowledged',
  });
}

/**
 * Updates the sensor health status
 * @param machineId The machineId containing the sensor
 * @param sensorId THe sensorId for the sensor that needs to be updated
 */
export async function updateSensorHealthStatus(
  machineId: string,
  sensorId: string,
  status: string
) {
  await firestore.doc(`machines/${machineId}/sensors/${sensorId}`).update({
    healthStatus: status,
  });
}

/**
 * Checks whether a machine exists in the firestore
 * @param machineId The machineId for a machine
 */
export async function machineExists(machineId: string): Promise<boolean> {
  return (await firestore.doc(`machines/${machineId}`).get()).exists;
}

/**
 * Checks whether a sensor exists in the firestore
 * @param machineId The machineId containing the sensor
 * @param sensorId The sensorId for the sensor
 */
export async function sensorExists(
  machineId: string,
  sensorId: string
): Promise<boolean> {
  return (
    await firestore.doc(`machines/${machineId}/sensors/${sensorId}`).get()
  ).exists;
}

/**
 * Retrives the 'SensorData' collection from the firestore for a particular
 * sensor.
 * @param machineId The machineId which contains the sensor
 * @param sensorId The sensorId for the sensor
 */
export async function getSensorData(machineId: string, sensorId: string) {
  const sensorDataCollectionRef = await firestore
    .collection(`machines/${machineId}/sensors/${sensorId}/sensorData`)
    .get();
  const sensorDataDoc = sensorDataCollectionRef.docs.map(addIdToDoc);
  return sensorDataDoc;
}

/**
 * Retrives a 'User' document from the firestore containing the input email
 * @param userEmail The user email for which to retrieve a corresponding
 * user
 */
export async function getUserFromEmail(userEmail: string) {
  const userQuery = await firestore
    .collection('users')
    .where('email', '==', userEmail)
    .get();

  let userData: FirebaseFirestore.DocumentData | null;
  if (!userQuery.empty) {
    const snapshot = userQuery.docs[0];
    userData = snapshot.data();
  } else {
    userData = null;
  }

  return userData;
}

/**
 * Creates a new 'User' document in the firestore with an email
 * @param userEmail The email to be associated with a new user
 */
export async function addUser(userEmail: string) {
  await firestore.collection('users').add({
    email: userEmail,
    emails: [userEmail],
  });
}

/**
 * Updates the android appId associated with the user. The android appId
 * is used for push notifications
 * @param userEmail The email of the user
 * @param appId The android appId that needs to be updated
 */
export async function updateAndroidAppId(userEmail: string, appId: string) {
  const userData = await getUserFromEmail(userEmail);
  if (userData) {
    await (
      await firestore.collection('users').where('email', '==', userEmail).get()
    ).docs[0].ref.set(
      {
        androidAppId: appId,
      },
      { merge: true }
    );
  }
}
