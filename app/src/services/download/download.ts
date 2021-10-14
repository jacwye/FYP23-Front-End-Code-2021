import urljoin from "url-join";

const baseDownloadURI = urljoin(process.env.REACT_APP_ENDPOINT_URL || "", "download");

/**
 * Generates a url for downloading the sensor data for a particular sensor.
 * @param machineId Id of the machine which has the sensor
 * @param sensorId Id of the sensor
 */
export function getLinkForSensor(machineId: string, sensorId: string): string {
    return urljoin(baseDownloadURI, "machine", machineId, "sensor", sensorId);
}
