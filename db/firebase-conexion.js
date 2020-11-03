const admin = require('firebase-admin');
let serviceAcount = require('../repuestos.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAcount),
})
const db = admin.firestore();
module.exports = db;