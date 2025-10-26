const mongoose = require('mongoose');
require('dotenv').config();

// Cache the database connection for serverless environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully ✅');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error; // Throw error instead of exiting process in serverless
  }

  return cached.conn;
};

module.exports = connectDB;
