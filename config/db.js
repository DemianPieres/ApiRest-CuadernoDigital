// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10 segundos
      socketTimeoutMS: 45000, // 45 segundos
      connectTimeoutMS: 30000, // 30 segundos
      retryWrites: true,
      w: 'majority'
    });
    console.log(`Conectado a MongoDB Atlas: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error de conexión a MongoDB Atlas: ${err.message}`);
    throw err;
  }
};

module.exports = connectDB;