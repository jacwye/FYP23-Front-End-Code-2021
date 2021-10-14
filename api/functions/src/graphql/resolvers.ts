import { Resolvers } from '../generated/graphql';
import { queryResolvers } from './resolvers/query';
import { machineResolvers } from './resolvers/machine';
import { sensorResolvers } from './resolvers/sensor';
import { mutationResolvers } from './resolvers/mutation';

/**
 * Mapping the respective resolvers for GraphQl queries and mutations.
 * The resolvers contain functions which hold instructions regarding
 * how to handle queries and mutations from the schema. Queries are
 * used to fetch data from the database whereas mutations are used to
 * create or modify data from the database.
 */
export const resolvers: Resolvers = {
  Query: queryResolvers,
  Machine: machineResolvers,
  Sensor: sensorResolvers,
  Mutation: mutationResolvers,
};
