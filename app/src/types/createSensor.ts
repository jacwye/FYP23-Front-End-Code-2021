/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SensorInput, Status } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createSensor
// ====================================================

export interface createSensor_createSensor_sensor {
  __typename: "Sensor";
  name: string;
  healthStatus: Status;
  threshold: number;
}

export interface createSensor_createSensor {
  __typename: "SensorCreationResponse";
  sensor: createSensor_createSensor_sensor | null;
}

export interface createSensor {
  createSensor: createSensor_createSensor | null;
}

export interface createSensorVariables {
  input?: SensorInput | null;
}
