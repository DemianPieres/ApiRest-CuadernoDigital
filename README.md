# 📦 Sistema de Inventario de Productos

Aplicación web con API REST para la gestión de inventario de productos. Permite administrar productos con funcionalidades completas de CRUD, búsqueda, paginación y previsualización de imágenes.

---

## 🚀 Características

- ✅ Crear, leer, actualizar y eliminar productos
- 🔍 Búsqueda por código o nombre
- 📄 Paginación de resultados
- 🖼️ Previsualización de imágenes desde URL
- 📱 Interfaz responsive (adaptada a móviles)

---

## 🛠️ Tecnologías

- **Backend**: Node.js, Express, Mongoose, MongoDB Atlas  
- **Frontend**: HTML5, CSS3, JavaScript (vanilla)  
- **Empaquetado**: [`pkg`](https://github.com/vercel/pkg)  
- **Base de datos**: MongoDB (cloud vía Atlas)

---

## 📁 Estructura del Proyecto

MMDRINVENTARIODEPRODUCTOS/
├── config/
│ └── db.js # Conexión a MongoDB
├── controllers/
│ └── products.js # Lógica del CRUD y búsquedas
├── models/
│ └── Product.js # Modelo Mongoose
├── routes/
│ └── productRoutes.js # Rutas de API
├── .env.example # Variables de entorno de ejemplo
├── index.html # Interfaz web del usuario
├── package.json # Configuración de dependencias
├── server.js # Punto de entrada de la API
├── start.bat # Inicio automático en Windows
└── start.vbs # Ejecutar sin consola


---

## ⚙️ Instalación y Uso

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

2. Instalar dependencias
npm install

3. Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus credenciales de MongoDB Atlas

4. Iniciar en entorno de desarrollo
npm start
# Abre http://localhost:5000 en tu navegador

📦 Empaquetado para Producción

1. Generar ejecutable
npm run build

2. Archivos para distribución
dist/
├── miApi.exe           # API empaquetada
├── start.bat           # Script de inicio rápido
├── start.vbs           # Ejecutar sin consola
├── .env                # Configuración
└── index.html          # Interfaz web

3. Uso en otra máquina
A)Copiar la carpeta dist/ a cualquier PC con Windows
B)Ejecutar start.vbs
C)El sistema se abre automáticamente en el navegador

⚙️ Archivo .env de ejemplo
PORT=5000
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/basededatos?retryWrites=true&w=majority

📄 Archivos a incluir en el commit
📁 config/
└── db.js
📁 controllers/
└── products.js
📁 models/
└── Product.js
📁 routes/
└── productRoutes.js
📄 .env.example
📄 .gitignore
📄 index.html
📄 package.json
📄 README.md
📄 server.js
📄 start.bat
📄 start.vbs
