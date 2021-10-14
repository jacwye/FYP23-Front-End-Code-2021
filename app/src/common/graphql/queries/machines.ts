import { gql } from "@apollo/client";

export const GET_MACHINES = gql`
    query getMachines {
        machines {
            id
            name
            subscribers
            operatingStatus
            notificationStatus
            healthStatus
            image
            sensors {
                id
                name
                healthStatus
            }
        }
    }
`;

export const GET_MACHINE_BY_ID = gql`
    query getMachineById($id: ID!) {
        machine(id: $id) {
            id
            name
            operatingStatus
            healthStatus
            notificationStatus
            image
            subscribers
            sensors {
                id
                name
                healthStatus
                threshold
                sensorData {
                    timestamp
                    value
                }
            }
        }
    }
`;
