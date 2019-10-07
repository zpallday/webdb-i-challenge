const express = require('express');

const db = require('./data/dbConfig.js');
const knex = require('knex')
const server = express();

server.use(express.json());


server.get('/api/accounts/', (req, res) => {
    db('accounts')
    .select('name', 'budget')
    .then(accounts => {
        console.log(accounts);
        res.status(200).json(accounts)
    })
    .catch(error => {
        console.log(error);
        res.json(error)
    })
})

server.get('/api/accounts/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id})
        .first()
        .then(response => {
            res.status(200).json(response).first();
        })
        .catch(error => {
            console.log(error).json(error)
        })
    })





module.exports = server;