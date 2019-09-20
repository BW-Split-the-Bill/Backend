const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');
const restricted = require('../middleware/restricted.js');

// returns a master list of all users in the database
usersRouter.get('/all', restricted, async (req, res) => {
    // if the user has admin in header as privilege, AND is logged in, they can see all users 
    if(req.headers.privilege === 'admin') {
        const authDb = await db('auth').select('userId', 'username');
        res.status(200).json(authDb);        
    } else {
        res.status(401).send({message:"Invalid Request"});
    };    
});


module.exports = usersRouter;