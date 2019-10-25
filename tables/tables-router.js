const tablesRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');
const restricted = require('../middleware/restricted.js');

tablesRouter.post('/new', restricted, async (req, res) => {
    const table = req.body
    const restaurant = req.body
    const confirm = await db('tables').insert(table)
    const tableId = confirm[0]
    const thing = await db('tables').where({ tableId })
    res.status(201).json(thing);
});

tablesRouter.get('/', restricted, async (req, res) => {
    return db('tables')
    .then(tables => {
        res.status(200).json(tables)
    })
    .catch(err => {
        res.status(500).json('failed getting all tables', err)
    });
});

tablesRouter.get('/:id', restricted, async (req, res) => {
    const { id } = req.params;
    const tableId = id;
    return db('tables').where({ tableId })
    // .where({ id })
    .then(table => {
        res.status(200).json(table)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json('failed get table by id', err);
    });
});


module.exports = tablesRouter;