/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unsubscribeFromMachine
// ====================================================

export interface unsubscribeFromMachine_unsubscribeFromMachine_user_machinesSubscribed {
  __typename: "Machine";
  id: string;
}

export interface unsubscribeFromMachine_unsubscribeFromMachine_user {
  __typename: "User";
  id: string;
  email: string;
  emails: (string | null)[] | null;
  machines: (string | null)[] | null;
  machinesSubscribed: (unsubscribeFromMachine_unsubscribeFromMachine_user_machinesSubscribed | null)[] | null;
}

export interface unsubscribeFromMachine_unsubscribeFromMachine {
  __typename: "MachineSubscriptionResponse";
  user: unsubscribeFromMachine_unsubscribeFromMachine_user | null;
}

export interface unsubscribeFromMachine {
  unsubscribeFromMachine: unsubscribeFromMachine_unsubscribeFromMachine | null;
}

export interface unsubscribeFromMachineVariables {
  userId: string;
  machineId: string;
}
