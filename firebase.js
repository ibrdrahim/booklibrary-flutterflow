const admin = require('firebase-admin');

const serviceAccount = require('./firebase-config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://booklibrary-flutterflow-dev-default-rtdb.firebaseio.com/" 
});

const db = admin.firestore();

module.exports = { admin, db };
