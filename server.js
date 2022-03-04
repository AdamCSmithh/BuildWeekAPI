require('dotenv').config()
const express = require('express')
const server = express();
const port = process.env.PORT || 3000
const usersRouter = require("./api/users/users-router")
const productsRouter = require("./api/products/products-router")
const authRouter = require("./api/auth/auth-router.js")


server.use(express.json());

server.use(
    session({
      name: 'Rodger',
      secret: '*cough*',
      cookie: {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          secure: false,
          httpOnly: true,
      },
      resave: false,
      saveUninitialized: false,
  
      store: new store({
          knex: require('./api/data/db-config'),
          tablename: 'sessions',
          sidfieldname: 'sid',
          createtable: true,
          clearInterval: 1000 * 60 * 60,
    }),
  }))

server.use("/api/users-router", usersRouter);
server.use("/api/products-router", productsRouter);
server.use("/api/auth", authRouter);


server.get('/', (req, res) => {
    res.send('API up and running!');
});

server.listen(3000, () => console.log(`API running on ${port}`));
