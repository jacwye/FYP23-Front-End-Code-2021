/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OperatingStatus, NotificationStatus, Status } from "./globalTypes";

// ====================================================
// GraphQL query operation: getMachines
// ====================================================

export interface getMachines_machines_sensors {
  __typename: "Sensor";
  id: string;
  name: string;
  healthStatus: Status;
}

export interface getMachines_machines {
  __typename: "Machine";
  id: string;
  name: string;
  subscribers: (string | null)[] | null;
  operatingStatus: OperatingStatus | null;
  notificationStatus: NotificationStatus | null;
  healthStatus: Status | null;
  image: string;
  sensors: getMachines_machines_sensors[];
}

export interface getMachines {
  machines: getMachines_machines[];
}
