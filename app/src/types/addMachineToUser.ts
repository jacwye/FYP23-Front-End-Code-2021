/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addMachineToUser
// ====================================================

export interface addMachineToUser_addMachineToUser_user_machinesSubscribed {
  __typename: "Machine";
  id: string;
}

export interface addMachineToUser_addMachineToUser_user {
  __typename: "User";
  id: string;
  email: string;
  emails: (string | null)[] | null;
  machines: (string | null)[] | null;
  machinesSubscribed: (addMachineToUser_addMachineToUser_user_machinesSubscribed | null)[] | null;
}

export interface addMachineToUser_addMachineToUser {
  __typename: "MachineAddedToUserResponse";
  user: addMachineToUser_addMachineToUser_user | null;
}

export interface addMachineToUser {
  addMachineToUser: addMachineToUser_addMachineToUser | null;
}

export interface addMachineToUserVariables {
  userId: string;
  machineId: string;
}
