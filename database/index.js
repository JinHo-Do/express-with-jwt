require('dotenv').config();
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || 'mongodb://localhost/test';

mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;

db.on('error', error => {
  console.log(`❌  Mongoose connection error: ${error}`);
});
db.once('open', () => {
  console.log('✅  Connected to mongodb');
});
