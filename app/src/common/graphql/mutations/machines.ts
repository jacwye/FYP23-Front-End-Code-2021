import { gql } from "@apollo/client";

export const CREATE_MACHINE = gql`
    mutation createMachine($name: String!, $image: String!) {
        createMachine(name: $name, image: $image) {
            machine {
                id
                name
                notificationStatus
                healthStatus
                operatingStatus
                image
            }
        }
    }
`;

export const UPDATE_MACHINE = gql`
    mutation updateMachine($id: ID!, $input: MachineUpdateInput) {
        updateMachine(id: $id, input: $input) {
            machine {
                id
                name
                notificationStatus
                healthStatus
                operatingStatus
                subscribers
                image
            }
        }
    }
`;
