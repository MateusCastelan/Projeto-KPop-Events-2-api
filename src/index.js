const express = require('express')
const app = express()
const routes = require('./api/routes')


app.use(function (req, res, next) { //
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Tratamento para solicitações OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
}); //


app.use('/api', routes)


app.listen(8080, function () {
    console.log('Aplicação executando na porta 8080!');
}); 