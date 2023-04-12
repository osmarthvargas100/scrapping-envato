const express = require("express");
const router = express.Router();
const path = require("path"); // Asegúrate de importar el módulo 'path'



router.get('/', async function(req, res) {

    res.render('products');
});


module.exports = router;
