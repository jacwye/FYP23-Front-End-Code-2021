import { gql } from "@apollo/client";

export const CREATE_SENSOR = gql`
    mutation createSensor($input: SensorInput) {
        createSensor(input: $input) {
            sensor {
                name
                healthStatus
                threshold
            }
        }
    }
`;

export const UPDATE_SENSOR = gql`
    mutation updateSensor($id: ID!, $machineId: ID!, $input: SensorUpdateInput) {
        updateSensor(id: $id, machineId: $machineId, input: $input) {
            sensor {
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
