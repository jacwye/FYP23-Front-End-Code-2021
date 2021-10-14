/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import * as functions from 'firebase-functions';
import { ConstructFileDownloadServer } from './downloads/server';
import { ConstructGraphQLServer } from './graphql/server';
import { ConstructIngestorServer } from './ingestor/server';
import { updateUsers } from './notifications/notificationService';

/**
 * Main file for the backend from where the individual functions are
 * initialised.
 */

// Setting up the firebase region
const USCentralRegion = functions.SUPPORTED_REGIONS[0];

// Initialising the GraphQl server whenever a request gets made to
// '/graph'
exports.graph = functions
  .region(USCentralRegion)
  .https.onRequest(ConstructGraphQLServer());

// Scheduling the update users function to be run every hour
exports.notify = functions.pubsub
  .schedule('0 * * * *')
  .timeZone('Pacific/Auckland')
  .onRun(updateUsers);

// Initialising the file download server whenever a request gets made to
// '/download'
exports.download = functions
  .region(USCentralRegion)
  .https.onRequest(ConstructFileDownloadServer());

// Initialising the ingestor server whenever a request gets made to
// '/ingestor'
exports.ingestor = functions
  .region(USCentralRegion)
  .https.onRequest(ConstructIngestorServer());
