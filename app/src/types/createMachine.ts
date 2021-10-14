/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationStatus, Status, OperatingStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createMachine
// ====================================================

export interface createMachine_createMachine_machine {
  __typename: "Machine";
  id: string;
  name: string;
  notificationStatus: NotificationStatus | null;
  healthStatus: Status | null;
  operatingStatus: OperatingStatus | null;
  image: string;
}

export interface createMachine_createMachine {
  __typename: "MachineCreationResponse";
  machine: createMachine_createMachine_machine | null;
}

export interface createMachine {
  createMachine: createMachine_createMachine | null;
}

export interface createMachineVariables {
  name: string;
  image: string;
}
