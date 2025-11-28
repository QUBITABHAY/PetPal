const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = process.env.FIREBASE_KEY_PATH;


const serviceAccount = require(path.resolve(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;
