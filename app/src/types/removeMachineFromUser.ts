/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeMachineFromUser
// ====================================================

export interface removeMachineFromUser_removeMachineFromUser_user_machinesSubscribed {
  __typename: "Machine";
  id: string;
}

export interface removeMachineFromUser_removeMachineFromUser_user {
  __typename: "User";
  id: string;
  email: string;
  emails: (string | null)[] | null;
  machines: (string | null)[] | null;
  machinesSubscribed: (removeMachineFromUser_removeMachineFromUser_user_machinesSubscribed | null)[] | null;
}

export interface removeMachineFromUser_removeMachineFromUser {
  __typename: "MachineRemovedFromUserResponse";
  user: removeMachineFromUser_removeMachineFromUser_user | null;
}

export interface removeMachineFromUser {
  removeMachineFromUser: removeMachineFromUser_removeMachineFromUser | null;
}

export interface removeMachineFromUserVariables {
  userId: string;
  machineId: string;
}
