import express from 'express';
import { config } from 'dotenv';
import * as admin from 'firebase-admin';

if (config().error)
{
    console.error('\x1b[31m%s\x1b[0m', `Could not parse the config file for environment variables!`);
    process.exit(1);
}

import './config/config';
import mongoose from './db/mongoose';

let refreshToken;

const myApp = admin.initializeApp({
    credential: admin.credential.refreshToken(refreshToken),
    databaseURL: 'https://auth-demo-7d435.firebaseio.com'
});

const defaultAuth = admin.auth();
const firestoreAccess = admin.firestore();

firestoreAccess






const app = express();


export default app;