/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateUserEmails
// ====================================================

export interface updateUserEmails_updateUserEmails_user_machinesSubscribed {
  __typename: "Machine";
  id: string;
}

export interface updateUserEmails_updateUserEmails_user {
  __typename: "User";
  id: string;
  email: string;
  emails: (string | null)[] | null;
  machines: (string | null)[] | null;
  machinesSubscribed: (updateUserEmails_updateUserEmails_user_machinesSubscribed | null)[] | null;
}

export interface updateUserEmails_updateUserEmails {
  __typename: "EmailUpdateResponse";
  user: updateUserEmails_updateUserEmails_user | null;
}

export interface updateUserEmails {
  updateUserEmails: updateUserEmails_updateUserEmails | null;
}

export interface updateUserEmailsVariables {
  userId: string;
  emails?: (string | null)[] | null;
}
