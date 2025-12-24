require('dotenv').config();
const mongoose = require('mongoose');

async function connection() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('MongoDB Connected');
}

module.exports = connection;
