require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs'); // Para escribir logs de errores

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Función mejorada para conectar a MongoDB Atlas con reintentos
const connectToAtlas = async () => {
  try {
    console.log('Conectando a MongoDB Atlas...');
    
    // Usamos la función original de conexión
    await connectDB();
    
    console.log('Conexión a MongoDB Atlas establecida');
    
    // Verificamos el estado de la conexión
    const connectionState = mongoose.connection.readyState;
    console.log(`Estado de conexión a MongoDB: ${connectionState}`);
    
    // 1 = conectado, 2 = conectando, 3 = desconectando, 0 = desconectado
    if (connectionState !== 1) {
      throw new Error('Conexión establecida pero estado incorrecto');
    }
    
    return true;
  } catch (error) {
    console.error(`Error conectando a MongoDB Atlas: ${error.message}`);
    
    // Manejo específico de errores de red
    if (error.message.includes('ECONNREFUSED') || 
        error.message.includes('ENOTFOUND') ||
        error.message.includes('ETIMEDOUT')) {
      console.error('ERROR DE RED: Verifica tu conexión a internet');
    }
    
    // Escribimos el error en un archivo log
    fs.writeFileSync('atlas-connection.log', `[${new Date().toISOString()}] ${error.message}\n`, { flag: 'a' });
    
    console.log('Reintentando en 10 segundos...');
    setTimeout(connectToAtlas, 10000);
    return false;
  }
};

// Iniciar la conexión a MongoDB Atlas
connectToAtlas();

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname)));

// Ruta para el frontend - sirve el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware para verificar conexión a MongoDB antes de procesar solicitudes
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: 'Servicio no disponible', 
      message: 'Base de datos no conectada. Por favor, intente nuevamente más tarde.',
      details: 'Verifique su conexión a internet y que MongoDB Atlas esté disponible'
    });
  }
  next();
});

// Rutas de la API
app.use('/api/products', require('./routes/productRoutes'));

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Manejo especial para errores de base de datos
  if (err.name === 'MongoNetworkError') {
    return res.status(503).json({ 
      error: 'Error de red', 
      message: 'No se pudo conectar a la base de datos',
      solution: 'Verifique su conexión a internet'
    });
  }
  
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor solo si MongoDB está conectado
const startServer = () => {
  if (mongoose.connection.readyState === 1) {
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
      console.log(`Frontend disponible en http://localhost:${port}`);
      console.log('API lista para recibir solicitudes');
      console.log(`Conectado a MongoDB Atlas: ${process.env.MONGO_URI.split('@')[1].split('/')[0]}`);
    });
  } else {
    console.log('Retrasando inicio del servidor hasta que MongoDB Atlas esté conectado...');
    setTimeout(startServer, 5000);
  }
};

// Iniciar el servidor después de un breve retraso inicial
setTimeout(startServer, 2000);