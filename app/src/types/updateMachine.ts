/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MachineUpdateInput, NotificationStatus, Status, OperatingStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateMachine
// ====================================================

export interface updateMachine_updateMachine_machine {
  __typename: "Machine";
  id: string;
  name: string;
  notificationStatus: NotificationStatus | null;
  healthStatus: Status | null;
  operatingStatus: OperatingStatus | null;
  subscribers: (string | null)[] | null;
  image: string;
}

export interface updateMachine_updateMachine {
  __typename: "MachineUpdatedResponse";
  machine: updateMachine_updateMachine_machine | null;
}

export interface updateMachine {
  updateMachine: updateMachine_updateMachine | null;
}

export interface updateMachineVariables {
  id: string;
  input?: MachineUpdateInput | null;
}
