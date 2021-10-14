import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser($email: String!) {
        createUser(email: $email) {
            user {
                id
                email
                emails
                machines
                machinesSubscribed {
                    id
                }
            }
        }
    }
`;

export const SUBSCRIBE_TO_MACHINE = gql`
    mutation subscribeToMachine($userId: ID!, $machineId: ID!) {
        subscribeToMachine(userId: $userId, machineId: $machineId) {
            user {
                id
                email
                emails
                machines
                machinesSubscribed {
                    id
                }
            }
        }
    }
`;

export const UNSUBSCRIBE_FROM_MACHINE = gql`
    mutation unsubscribeFromMachine($userId: ID!, $machineId: ID!) {
        unsubscribeFromMachine(userId: $userId, machineId: $machineId) {
            user {
                id
                email
                emails
                machines
                machinesSubscribed {
                    id
                }
            }
        }
    }
`;

export const UPDATE_USER_EMAILS = gql`
    mutation updateUserEmails($userId: ID!, $emails: [String]) {
        updateUserEmails(userId: $userId, emails: $emails) {
            user {
                id
                email
                emails
                machines
                machinesSubscribed {
                    id
                }
            }
        }
    }
`;

export const ADD_MACHINE_TO_USER = gql`
    mutation addMachineToUser($userId: ID!, $machineId: ID!) {
        addMachineToUser(userId: $userId, machineId: $machineId) {
            user {
                id
                email
                emails
                machines
                machinesSubscribed {
                    id
                }
            }
        }
    }
`;

export const REMOVE_MACHINE_FROM_USER = gql`
    mutation removeMachineFromUser($userId: ID!, $machineId: ID!) {
        removeMachineFromUser(userId: $userId, machineId: $machineId) {
            user {
                id
                email
                emails
                machines
                machinesSubscribed {
                    id
                }
            }
        }
    }
`;
