import {
  addRMSValueToSensor,
  getThresholdValueForSensor,
  machineExists,
  sensorExists,
  updateMachineNotificationStatus,
  updateSensorHealthStatus,
} from '../helper/firebaseInteractions';
import { notifyUsers } from '../notifications/notificationService';

/**
 * Custom interface to store result of whether the machine and
 * sensor have been found
 */
export interface MachineAndSensorFoundResponse {
  machine: string;
  sensor: string;
}

/**
 * Processes the data that was received through a POST request and stores
 * it in the firestore. Additionally, checks whether the RMS is over the
 * threshold for the particular sensor and notifys the user.
 * @param machineId The machineId from the input request
 * @param sensorId The sensorId from the input request
 * @param timestamp The time the RMS value was calculated on the engine
 * @param value The received RMS value
 */
export async function processDataFromRequestBody(
  machineId: string,
  sensorId: string,
  timestamp: string,
  value: number
) {
  await doThresholdDetection(value, machineId, sensorId);
  await storeRMSValue(value, timestamp, machineId, sensorId);
}

/**
 * Checks whether the RMS value received for a sensor is over the threshold
 * set for that sensor.
 * @param value The received RMS value
 * @param machineId The machineId from the input request
 * @param sensorId The sensorId from the input request
 */
async function doThresholdDetection(
  value: number,
  machineId: string,
  sensorId: string
) {
  const thresholdValue: number = await getThresholdValueForSensor(
    machineId,
    sensorId
  );

  if (value > thresholdValue) {
    await updateSensorHealthStatus(machineId, sensorId, 'Critical');
    await updateMachineNotificationStatus(machineId);
    notifyUsers(thresholdValue, value, sensorId, machineId);
  } else if (value < thresholdValue && value > 0.9 * thresholdValue) {
    await updateSensorHealthStatus(machineId, sensorId, 'Moderate');
  } else {
    await updateSensorHealthStatus(machineId, sensorId, 'Nominal');
  }
}

/**
 * Stores the received RMS value for a sensor into firestore.
 * @param value The received RMS value
 * @param timestamp The time the RMS value was calculated on the engine
 * @param machineId The machineId from the input request
 * @param sensorId The sensorId from the input request
 */
async function storeRMSValue(
  value: number,
  timestamp: string,
  machineId: string,
  sensorId: string
) {
  addRMSValueToSensor(value, timestamp, machineId, sensorId);
}

/**
 * Checks whether a particular machine and sensor is present in
 * the database
 * @param machineId The machine id for the machine that needs to be checked
 * @param sensorId The sensor id for the sensor that needs to be checked
 */
export async function checkMachineAndSensor(
  machineId: string,
  sensorId: string
): Promise<MachineAndSensorFoundResponse> {
  const response: MachineAndSensorFoundResponse = {
    machine: 'NULL',
    sensor: 'NULL',
  };
  if (await machineExists(machineId)) {
    if (await sensorExists(machineId, sensorId)) {
      response.machine = 'FOUND';
      response.sensor = 'FOUND';
      return response;
    } else {
      response.machine = 'FOUND';
      response.sensor = 'NOT FOUND';
      return response;
    }
  } else {
    response.machine = 'NOT FOUND';
    response.sensor = 'NOT FOUND';
    return response;
  }
}
