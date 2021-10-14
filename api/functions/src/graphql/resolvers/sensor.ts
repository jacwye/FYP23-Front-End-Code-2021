import { SensorResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

export const sensorResolvers: SensorResolvers = {
  // Retrieves sample chunks when sensors are queried
  sensorData: async (parent, args) => {
    const sensorDataDocs = MachineStore.getSensorData(
      parent.machineId,
      parent.id
    );
    return sensorDataDocs;
  },
};
