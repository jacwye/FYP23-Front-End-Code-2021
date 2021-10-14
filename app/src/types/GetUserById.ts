/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserByID
// ====================================================

export interface getUserByID_user_machinesSubscribed {
  __typename: "Machine";
  id: string;
}

export interface getUserByID_user {
  __typename: "User";
  id: string;
  email: string;
  emails: (string | null)[] | null;
  machines: (string | null)[] | null;
  machinesSubscribed: (getUserByID_user_machinesSubscribed | null)[] | null;
}

export interface getUserByID {
  user: getUserByID_user | null;
}

export interface getUserByIDVariables {
  id: string;
}
