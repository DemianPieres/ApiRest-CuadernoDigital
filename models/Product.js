// models/Product.js
const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^\d{2,}$/  // Ej: "01", "100"
  },
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  imageUrl: { 
    type: String, 
    required: false, // Cambiar a false
    validate: {
      validator: function(v) {
        // Validar solo si existe un valor
        if (v && v.trim() !== '') {
          return validator.isURL(v);
        }
        return true; // Valor vacío es válido
      },
      message: "URL inválida"
    }
  },
  stock: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  available: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);