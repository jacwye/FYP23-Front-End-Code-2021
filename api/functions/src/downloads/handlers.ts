import { getSensorData } from '../helper/firebaseInteractions';

/**
 * Custom interface used to store properties for sensor data
 */
interface SensorDataWithID {
  onboardingComplete: boolean;
  timestamp: FirebaseFirestore.Timestamp;
  value: number;
  id: string;
}

/**
 * Generates a string representation of a CSV containing the sensor
 * data for a particular sensor.
 * @param machineId The machineId which contains the sensor
 * @param sensorId The sensorId for the sensor
 */
export const generateSensorDataCSV = async (
  machineId: string,
  sensorId: string
): Promise<string> => {
  const sensorData: SensorDataWithID[] = await getSensorData(
    machineId,
    sensorId
  );

  let fileString = 'timestamp, value\n';

  // Iterate through the data and add it to the string representing
  // a new row in the CSV file
  sensorData.forEach((entry) => {
    fileString += `${entry.timestamp.toDate().toISOString()}, ${entry.value}\n`;
  });

  return fileString;
};
