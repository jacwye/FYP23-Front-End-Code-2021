import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import express from 'express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

/**
 * Interface to declare a custom type for the graphql queries that are
 * parsed by express server
 */
export interface GraphQLContext extends ExpressContext {
  req: express.Request & { user: UserRecord };
}
