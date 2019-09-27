const usernamePaidRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');
const restricted = require('../middleware/restricted.js');

// add friend to table
usernamePaidRouter.post('/', restricted, async (req, res) => {
    const { tableId, username } = req.body;
    const payload = { tableId, username };
    // console.log(payload);
    const response = await db('tableUsernamePaid').insert(payload)
    // console.log(response)
    // const response2 = ledgerId
    // console.log(response2)
    const final = await db('tableUsernamePaid').where({ username })
    // console.log(final)
    res.status(201).json(final)
});

// get ledger by ledger id
usernamePaidRouter.get('/ledgers/:id', restricted, async (req, res) => {
    const { id } = req.params;
    const ledgerId = id;
    const response  = await db('tableUsernamePaid').where({ ledgerId });
    res.status(200).json(response);
})

// mark ledger as paid
usernamePaidRouter.put('/ledgers/:id/pay', restricted, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const ledgerId = id;
    const response = await db('tableUsernamePaid').where({ ledgerId }).update(changes)
    const updated = await db('tableUsernamePaid').where({ ledgerId });   
    res.status(201).json(updated)
})

usernamePaidRouter.post('/ledgers/', restricted, async (req, res) => {
    const { username } = req.body
    // console.log('username', username)
    const response = await db('tableUsernamePaid').where({ username })
    if(response.length === 0){ 
        res.status(200).json({message: 'This user is not on any tabs'})
    } else {
        res.status(200).json(response)
    }
})

module.exports = usernamePaidRouter;