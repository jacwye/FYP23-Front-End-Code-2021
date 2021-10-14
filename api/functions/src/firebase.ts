import admin from 'firebase-admin';
import 'firebase/auth';
import 'firebase/storage';

/**
 * Initialising the firebase app. The respective
 * credentials that are required are supplied while
 * initialising the app.
 */
export const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://cms-uoa.firebaseio.com',
  storageBucket: 'cms-uoa.appspot.com',
});

export const FieldValue = admin.firestore.FieldValue;
export const Timestamp = admin.firestore.Timestamp;
