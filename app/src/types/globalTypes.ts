/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum NotificationStatus {
  Acknowledged = "Acknowledged",
  Unacknowledged = "Unacknowledged",
  Working = "Working",
}

export enum OperatingStatus {
  Offline = "Offline",
  Online = "Online",
}

export enum Status {
  Critical = "Critical",
  Moderate = "Moderate",
  Nominal = "Nominal",
}

export interface MachineUpdateInput {
  name?: string | null;
  healthStatus?: Status | null;
  notificationStatus?: NotificationStatus | null;
  operatingStatus?: OperatingStatus | null;
  subscribers?: (string | null)[] | null;
  image?: string | null;
}

export interface SensorInput {
  machineID: string;
  name: string;
  threshold: number;
}

export interface SensorUpdateInput {
  name?: string | null;
  healthStatus?: Status | null;
  threshold?: number | null;
  latestThresholdBreach?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
