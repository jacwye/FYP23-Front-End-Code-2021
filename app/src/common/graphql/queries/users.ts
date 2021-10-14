import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
    query getUserByEmail($email: String!) {
        user_email(email: $email) {
            id
            email
            emails
            machines
            machinesSubscribed {
                id
            }
        }
    }
`;

export const GET_USER_BY_ID = gql`
    query getUserByID($id: ID!) {
        user(id: $id) {
            id
            email
            emails
            machines
            machinesSubscribed {
                id
            }
        }
    }
`;
