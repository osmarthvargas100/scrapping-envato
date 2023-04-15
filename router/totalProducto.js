const express = require("express");
const router = express.Router();
const path = require("path"); // Asegúrate de importar el módulo 'path'
const { scrapeEnvato } = require("./proyecto");


router.get('/', async function(req, res) {
    const keyword = req.query.keyword;

    let data;

    // Verifica si 'keyword' está presente en la consulta
    if (keyword) {
        // Llama a la función 'scrapeEnvato()' con el valor de 'keyword'
        data = await scrapeEnvato(keyword);
    } else {
        // Asigna null o un valor vacío a 'data' si 'keyword' no está presente
        data = await scrapeEnvato(keyword);
    }
    const result = await scrapeEnvato("trends");
    console.log(result);
    // Redirige la solicitud a la ruta '/otraRuta' y pasa la data como parámetro en la URL
    res.render('totalProducto',{products: data});
});


module.exports = router;
