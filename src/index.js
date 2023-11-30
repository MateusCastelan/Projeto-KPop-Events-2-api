const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express()
const routes = require('./api/routes')
const mongoose = require('mongoose');


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
}); 

mongoose.connect('mongodb+srv://web2kpop:Kpop2222@cluster0.kdjob5o.mongodb.net/');

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
    mongoUrl: 'mongodb+srv://web2kpop:Kpop2222@cluster0.kdjob5o.mongodb.net/',
  });
  
  app.use(
    session({
      secret: 'sua_chave_secreta_aqui',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      unset: 'destroy', 
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Um dia
      },
    })
  );
  
  


app.use('/api', routes)


app.listen(8080, function () {
    console.log('Aplicação executando na porta 8080!');
}); 