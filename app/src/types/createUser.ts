/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser_user_machinesSubscribed {
  __typename: "Machine";
  id: string;
}

export interface createUser_createUser_user {
  __typename: "User";
  id: string;
  email: string;
  emails: (string | null)[] | null;
  machines: (string | null)[] | null;
  machinesSubscribed: (createUser_createUser_user_machinesSubscribed | null)[] | null;
}

export interface createUser_createUser {
  __typename: "UserCreationResponse";
  user: createUser_createUser_user | null;
}

export interface createUser {
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  email: string;
}
