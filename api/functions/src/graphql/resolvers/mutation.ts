import { MutationResolvers } from '../../generated/graphql';
import { MachineStore } from '../MachineStore';

// Resolvers to handle the mutations when a user attempts to create or update something
// in the database
export const mutationResolvers: MutationResolvers = {
  // Handles mutation to update a machine with the given parameters
  updateMachine: async (parent, args) => {
    const machine = await MachineStore.updateMachine(
      args.id,
      args.input?.name,
      args.input?.healthStatus,
      args.input?.notificationStatus,
      args.input?.operatingStatus,
      args.input?.image,
      args.input?.subscribers
    );

    const resp: any = {
      code: 'machine_update/success',
      success: true,
      message: 'Machine Updated Successfully.',
      machine: machine,
    };

    return resp;
  },

  // Handles mutation to update a sensor with the given parameters
  updateSensor: async (parent, args) => {
    const sensor = await MachineStore.updateSensor(
      args.machineId,
      args.id,
      args.input?.name,
      args.input?.healthStatus,
      args.input?.threshold,
      args.input?.latestThresholdBreach
    );

    const resp: any = {
      code: 'sensor_update/success',
      success: true,
      message: 'Sensor Updated Successfully.',
      sensor: sensor,
    };

    return resp;
  },

  // Handles mutation to create a new machine with the given parameters
  createMachine: async (parent, args) => {
    const newMachine = await MachineStore.createMachine(args.name, args.image);

    const resp: any = {
      code: 'machine_create/success',
      success: true,
      message: 'Machine Created Successfully.',
      machine: newMachine,
    };

    return resp;
  },

  // Handles mutation to create a new machine with the given parameters
  createSensor: async (parent, args) => {
    const newSensor = await MachineStore.createSensor(
      args.input?.machineID,
      args.input?.name,
      args.input?.threshold
    );

    const resp: any = {
      code: 'sensor_create/success',
      success: true,
      message: 'Sensor Created Successfully.',
      sensor: newSensor,
    };

    return resp;
  },

  // Handles mutation to create a new user with the given parameters
  createUser: async (parent, args) => {
    const newUser = await MachineStore.createUser(args.email);

    const resp: any = {
      code: 'user_create/success',
      success: true,
      message: 'Sensor Created Successfully.',
      user: newUser,
      emails: [],
    };

    return resp;
  },

  // Handles mutation to update a machines subscribers property by adding
  // a new user to the list
  subscribeToMachine: async (parent, args) => {
    const user = await MachineStore.subscribeToMachine(
      args.userId,
      args.machineId
    );

    const resp: any = {
      code: 'user_subscribe/success',
      success: true,
      message: 'Machine Subscribed Successfully.',
      user: user,
    };

    return resp;
  },

  // Handles mutation to update a machines subscribers property by removing
  // a user from the list
  unsubscribeFromMachine: async (parent, args) => {
    const user = await MachineStore.unsubscribeFromMachine(
      args.userId,
      args.machineId
    );

    const resp: any = {
      code: 'user_unsubscribe/success',
      success: true,
      message: 'Machine Unsubscribed Successfully.',
      user: user,
    };

    return resp;
  },

  // Handles mutation to update the emails associated with a user
  updateUserEmails: async (parent, args) => {
    const user = await MachineStore.updateUserEmails(args.userId, args.emails);

    const resp: any = {
      code: 'user_updateEmails/success',
      success: true,
      message: 'Emails successfully updated',
      user: user,
    };

    return resp;
  },

  // Handles mutation to associate a machine to the user by adding it
  // the machines property for a user
  addMachineToUser: async (parent, args) => {
    const user = await MachineStore.addMachineToUser(
      args.userId,
      args.machineId
    );

    const resp: any = {
      code: 'user_addMachine/success',
      success: true,
      message: 'Machine successfully added',
      user: user,
    };

    return resp;
  },

  // Handles mutation to remove the association between a machine and
  // a user by removing it from the machines property for a user
  removeMachineFromUser: async (parent, args) => {
    const user = await MachineStore.removeMachineFromUser(
      args.userId,
      args.machineId
    );

    const resp: any = {
      code: 'user_removeMachine/success',
      success: true,
      message: 'Machine successfully removed',
      user: user,
    };

    return resp;
  },
};
