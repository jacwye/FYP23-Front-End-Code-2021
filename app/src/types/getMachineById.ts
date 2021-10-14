/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OperatingStatus, Status, NotificationStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMachineById
// ====================================================

export interface getMachineById_machine_sensors_sensorData {
  __typename: "SensorData";
  timestamp: any;
  value: number;
}

export interface getMachineById_machine_sensors {
  __typename: "Sensor";
  id: string;
  name: string;
  healthStatus: Status;
  threshold: number;
  sensorData: getMachineById_machine_sensors_sensorData[];
}

export interface getMachineById_machine {
  __typename: "Machine";
  id: string;
  name: string;
  operatingStatus: OperatingStatus | null;
  healthStatus: Status | null;
  notificationStatus: NotificationStatus | null;
  image: string;
  subscribers: (string | null)[] | null;
  sensors: getMachineById_machine_sensors[];
}

export interface getMachineById {
  machine: getMachineById_machine | null;
}

export interface getMachineByIdVariables {
  id: string;
}
