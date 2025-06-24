// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createProduct,
  listProducts,
  searchProducts,  // ¡Asegúrate de importar esta función!
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');

// Validaciones
const productValidations = [
  body('code').notEmpty().withMessage('El código es obligatorio'),
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('category').notEmpty().withMessage('La categoría es obligatoria'),
  body('price').isFloat({ min: 0 }).withMessage('Precio inválido'),
  body('imageUrl')
  .optional({ checkFalsy: true }) // Hacer opcional
  .isURL().withMessage('URL de imagen inválida'),
  body('stock').isInt({ min: 0 }).withMessage('Stock inválido')
];

router.post('/', productValidations, createProduct);
router.get('/', listProducts);
router.get('/search', searchProducts);  // Ruta para búsquedas
router.get('/:id', getProduct);
router.put('/:id', productValidations, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;