require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.DATABASE || 'localhost:27017/login-api';

module.exports = async () => {
  mongoose.connect(`mongodb://${db}`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB.'))
  .catch(() => console.log('Error connecting.'));
};
