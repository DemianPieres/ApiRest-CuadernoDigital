const Product = require('../models/Product');

// Crear producto
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El código del producto ya existe' });
    }
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Listar productos con paginación
exports.listProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments();

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Buscar productos - VERSIÓN CORREGIDA
exports.searchProducts = async (req, res) => {
  const { code, name } = req.query;
  let filter = {};

  // Usar operador $or para buscar en ambos campos
  if (code || name) {
    filter.$or = [];
    
    if (code) {
      filter.$or.push({ code: { $regex: code, $options: 'i' } });
    }
    
    if (name) {
      filter.$or.push({ name: { $regex: name, $options: 'i' } });
    }
  }

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
};

// Obtener producto por ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El código ya existe' });
    }
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};