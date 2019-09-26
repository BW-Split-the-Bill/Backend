const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// routers=require('') go here
const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../users/users-router.js')
const tablesRouter = require('../tables/tables-router.js')
const usernamePaidRouter = require('../tables/usernamePaid-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth/', authRouter);
server.use('/users/', usersRouter);
server.use('/tables/', tablesRouter);
server.use('/upr/', usernamePaidRouter)

server.get('/', (req, res) => {
    res.status(200).json({message: 'OK running'});
})

module.exports = server;
