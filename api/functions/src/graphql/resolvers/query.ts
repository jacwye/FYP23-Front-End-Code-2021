import { QueryResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

// Resolvers to handle the queries when a user attempts to retrieve something from the database
export const queryResolvers: QueryResolvers = {
  // Handles query to retrieve a user with the given user id
  user: async (parent, args) => {
    const userData = await MachineStore.getUserByID(args.id);

    if (!userData) {
      return undefined;
    }

    return {
      ...userData,
    };
  },

  // Handles query to retrieve a user associated with the given user email
  user_email: async (parent, args) => {
    const userData = await MachineStore.getUserByEmail(args.email);

    if (!userData) {
      return undefined;
    }

    return {
      ...userData,
    };
  },

  // Handles query to retrieve one machine, given an ID
  machine: async (parent, args) => {
    const machineData = await MachineStore.getMachine(args.id);

    if (!machineData) {
      return undefined;
    }

    return {
      ...machineData,
    };
  },

  // Handles query to retrieve all machines in the database
  machines: async (parent, args, context) => {
    const machineDocs = await MachineStore.getMachines();

    return machineDocs;
  },

  // Handles query to retrieve a sensor in the database
  sensor: async (parent, args) => {
    const sensorData = await MachineStore.getSensor(args.machineId, args.id);

    if (!sensorData) {
      return undefined;
    }

    return {
      ...sensorData,
      machineId: args.machineId,
    };
  },
};
