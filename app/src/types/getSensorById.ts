/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Status } from "./globalTypes";

// ====================================================
// GraphQL query operation: getSensorById
// ====================================================

export interface getSensorById_sensor_sensorData {
  __typename: "SensorData";
  timestamp: any;
  value: number;
}

export interface getSensorById_sensor {
  __typename: "Sensor";
  name: string;
  healthStatus: Status;
  threshold: number;
  sensorData: getSensorById_sensor_sensorData[];
  latestThresholdBreach: string | null;
}

export interface getSensorById {
  sensor: getSensorById_sensor | null;
}

export interface getSensorByIdVariables {
  machineId: string;
  id: string;
}
