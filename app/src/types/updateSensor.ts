/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SensorUpdateInput, Status } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateSensor
// ====================================================

export interface updateSensor_updateSensor_sensor_sensorData {
  __typename: "SensorData";
  timestamp: any;
  value: number;
}

export interface updateSensor_updateSensor_sensor {
  __typename: "Sensor";
  name: string;
  healthStatus: Status;
  threshold: number;
  sensorData: updateSensor_updateSensor_sensor_sensorData[];
}

export interface updateSensor_updateSensor {
  __typename: "SensorUpdatedResponse";
  sensor: updateSensor_updateSensor_sensor | null;
}

export interface updateSensor {
  updateSensor: updateSensor_updateSensor | null;
}

export interface updateSensorVariables {
  id: string;
  machineId: string;
  input?: SensorUpdateInput | null;
}
