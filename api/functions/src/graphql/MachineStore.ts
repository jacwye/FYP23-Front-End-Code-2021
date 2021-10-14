import admin from 'firebase-admin';
import { firebaseApp } from '../firebase';
import {
  Machine,
  NotificationStatus,
  OperatingStatus,
  Sensor,
  User,
} from '../generated/graphql';
import { addIdToDoc } from './resolvers/utils';

const firestore = firebaseApp.firestore();

/**
 * This is a helper class, which helps us call different database functions for both querying and mutating
 */

/**
 * Query the firestore and retrieve a machine document with the given id
 * @param id Id of the machine
 */
const getMachine = async (id): Promise<any> => {
  const machine = await firestore.doc(`machines/${id}`).get();

  const machineData = addIdToDoc(machine);

  return machineData;
};

/**
 * Query the firestore and retieve all of the machines
 */
const getMachines = async (): Promise<any> => {
  return (await firestore.collection(`machines`).get()).docs.map(addIdToDoc);
};

/**
 * Query the firestore and retrieve a sensor document with the given id
 * @param machineId Id of the machine containing the sensor
 * @param id Id of the sensor
 */
const getSensor = async (machineId, id): Promise<any> => {
  const sensor = await firestore
    .doc(`machines/${machineId}/sensors/${id}`)
    .get();

  return addIdToDoc(sensor);
};

/**
 * Query the firestore and retrieve all of the sensor documents for a given
 * machine
 * @param machineId Id of the machine containing the sensor
 */
const getSensors = async (machineId): Promise<any> => {
  return (
    await firestore.collection(`machines/${machineId}/sensors`).get()
  ).docs.map((sensor) => {
    return {
      ...addIdToDoc(sensor),
      machineId: machineId,
    };
  });
};

/**
 * Query the firestore and retrieve all of the sensor data that is available
 * for a given machine
 * @param machineId Id of the machine containing the sensor
 * @param sensorId Id of the sensor containing the sensor data
 */
const getSensorData = async (machineId, sensorId): Promise<any> => {
  const sensorDataCollectionRef = await firestore
    .collection(`machines/${machineId}/sensors/${sensorId}/sensorData`)
    .orderBy('timestamp', 'desc')
    .limit(30)
    .get();
  const sensorDataDoc = sensorDataCollectionRef.docs.map(addIdToDoc);
  return sensorDataDoc;
};

/**
 * Query the firestore and add a new machine to the database
 * @param machineName The name for the new machine
 * @param imageURL The URL for the image that is displayed for the machine
 */
const createMachine = async (machineName, imageURL): Promise<Machine> => {
  const machineDoc = await firestore.collection('machines').add({
    name: machineName,
    healthStatus: 'Nominal',
    notificationStatus: 'Working',
    subscribers: [],
    image: imageURL,
  });

  return addIdToDoc(await machineDoc.get()) as Machine;
};

/**
 * Query the firestore and update a machine with the given id
 * with the given parameters. Not all parameters will be supplied.
 * Only update the ones that are.
 * @param machineId Id of the machine to be updated
 * @param name Name that needs to be updated
 * @param healthStatus Health status that needs to be updated
 * @param notificationStatus Notification status that needs to be updated
 * @param operatingStatus Operating status that needs to be updated
 * @param image Image URL that needs to be updated
 * @param subscribers The subscribers array that needs to be updated
 */
const updateMachine = async (
  machineId,
  name: string | null | undefined,
  healthStatus: string | null | undefined,
  notificationStatus: NotificationStatus | null | undefined,
  operatingStatus: OperatingStatus | null | undefined,
  image: string | null | undefined,
  subscribers: (string | null)[] | null | undefined
): Promise<Machine> => {
  const machineDoc = await firestore.doc(`machines/${machineId}`);
  // Filter out any null or undefined parameters, so that they are not persisted
  const toUpdate = Object.entries({
    name,
    healthStatus,
    subscribers,
    notificationStatus,
    operatingStatus,
    image,
  }).filter(([_, v]) => v !== null && v !== undefined);

  await machineDoc.update(Object.fromEntries(toUpdate));

  return addIdToDoc(await machineDoc.get()) as Machine;
};

/**
 * Query the database and add a new sensor to the database for
 * a given machine
 * @param machineId Id of the machine containing the sensor
 * @param sensorName The name for the sensor
 * @param threshold The threshold value for that sensor
 */
const createSensor = async (
  machineId,
  sensorName,
  threshold
): Promise<Sensor> => {
  const sensorDoc = await firestore
    .collection('machines')
    .doc(machineId)
    .collection('sensors')
    .add({
      name: sensorName,
      healthStatus: 'Nominal',
      threshold: threshold,
    });

  return addIdToDoc(await sensorDoc.get()) as Sensor;
};

/**
 * Query the firestore and update a sensor with the given id
 * with the given parameters. Not all parameters will be supplied.
 * Only update the ones that are.
 * @param machineID Id of the machine that contains the sensor
 * @param id Id of the sensor that needs to be updated
 * @param name The name of the sensor
 * @param healthStatus The health status of the sensor
 * @param threshold The threshold of the sensor
 * @param latestThresholdBreach The time with the threshold was last breached
 */
const updateSensor = async (
  machineID,
  id,
  name: string | null | undefined,
  healthStatus: string | null | undefined,
  threshold: number | null | undefined,
  latestThresholdBreach: string | null | undefined
): Promise<Sensor> => {
  const sensorDoc = await firestore.doc(`machines/${machineID}/sensors/${id}`);
  // Filter out any null or undefined parameters, so that they are not persisted
  const toUpdate = Object.entries({
    name,
    healthStatus,
    threshold,
    latestThresholdBreach,
  }).filter(([_, v]) => v !== null && v !== undefined);

  await sensorDoc.update(Object.fromEntries(toUpdate));

  return addIdToDoc(await sensorDoc.get()) as Sensor;
};

/**
 * Query the firestore and retrieve a user document with the
 * given email
 * @param email The email of the user
 */
const getUserByEmail = async (email): Promise<any> => {
  const userQuery = await firestore
    .collection('users')
    .where('email', '==', email)
    .get();

  let userData;
  if (!userQuery.empty) {
    const snapshot = userQuery.docs[0];
    userData = addIdToDoc(snapshot);
  } else {
    userData = null;
  }

  return userData;
};

/**
 * Query the firestore and retrieve a user document with the
 * given user email
 * @param id The id of the user
 */
const getUserByID = async (id): Promise<any> => {
  const user = await firestore.doc(`users/${id}`).get();

  const userData = addIdToDoc(user);

  return userData;
};

/**
 * Query the firestore and add a new user with the given email
 * @param email The email for the user
 */
const createUser = async (email): Promise<User> => {
  const userDoc = await firestore.collection('users').add({
    email: email,
    emails: [email],
  });

  return addIdToDoc(await userDoc.get()) as User;
};

/**
 * Query the firestore and add the user with the given id to the
 * subscriber list of the machine
 * @param userId Id of the user subscribing to a machine
 * @param machineId Id of the machine that the user is subscribing to
 */
const subscribeToMachine = async (userId, machineId): Promise<User> => {
  const userDoc = await firestore.doc(`users/${userId}`);
  const machineReference = await firestore.doc(`machines/${machineId}`);
  await userDoc.update({
    machinesSubscribed: admin.firestore.FieldValue.arrayUnion(machineReference),
  });

  return addIdToDoc(await userDoc.get()) as User;
};

/**
 * Query the firestore and remove the user with the given id from the
 * subscriber list of the machine
 * @param userId Id of the user unsubscribing from a machine
 * @param machineId Id of the machine that the user is unsubscribing from
 */
const unsubscribeFromMachine = async (userId, machineId): Promise<User> => {
  const userDoc = await firestore.doc(`users/${userId}`);
  const machineReference = await firestore.doc(`machines/${machineId}`);
  await userDoc.update({
    machinesSubscribed: admin.firestore.FieldValue.arrayRemove(
      machineReference
    ),
  });

  return addIdToDoc(await userDoc.get()) as User;
};

/**
 * Query the firestore and update the emails associated with a user
 * @param userId Id of the user
 * @param updatedEmails Array with the updated emails
 */
const updateUserEmails = async (userId, updatedEmails): Promise<User> => {
  const userDoc = await firestore.doc(`users/${userId}`);
  await userDoc.update({
    emails: updatedEmails,
  });

  return addIdToDoc(await userDoc.get()) as User;
};

/**
 * Query the firestore and add a machine to the users machine list
 * @param userId Id of the user that is adding a machine to its machine list
 * @param machineId Id of the machine that the user is adding
 */
const addMachineToUser = async (userId, machineId): Promise<User> => {
  const userDoc = await firestore.doc(`users/${userId}`);
  await userDoc.update({
    machines: admin.firestore.FieldValue.arrayUnion(machineId),
  });

  return addIdToDoc(await userDoc.get()) as User;
};

/**
 * Query the firestore and remove a machine from the users machine list
 * @param userId Id of the user that is removing a machine from its machine list
 * @param machineId Id of the machine that the user is adding
 */
const removeMachineFromUser = async (userId, machineId): Promise<User> => {
  const userDoc = await firestore.doc(`users/${userId}`);
  await userDoc.update({
    machines: admin.firestore.FieldValue.arrayRemove(machineId),
  });
  await unsubscribeFromMachine(userId, machineId);

  return addIdToDoc(await userDoc.get()) as User;
};

export const MachineStore = {
  getMachine,
  getMachines,
  getSensor,
  getSensors,
  getSensorData,
  createMachine,
  updateMachine,
  createSensor,
  updateSensor,
  getUserByEmail,
  getUserByID,
  createUser,
  subscribeToMachine,
  unsubscribeFromMachine,
  updateUserEmails,
  addMachineToUser,
  removeMachineFromUser,
};
