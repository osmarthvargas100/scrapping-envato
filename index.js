const express = require('express');
const path = require('path');
const app = express();

const productsRouter = require('./router/products');
const totalProducto = require('./router/totalProducto');


// Configurar la carpeta de vistas y el motor de plantillas
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs'); // Cambiar el motor de plantillas a ejs

// Habilitar el uso de archivos estáticos
app.use(express.static(path.join(__dirname, 'assets')));


// Configurar las rutas
app.use('/products', productsRouter);
app.use('/totalProducto',totalProducto);
// Agrega una nueva ruta para el formulario

const server = app.listen(8000, function(){
    console.log(`Listening http://localhost:${server.address().port}`);
});
