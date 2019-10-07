const express = require("express");

const db = require("./data/dbConfig.js");
const knex = require("knex");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db("accounts")
    .then(accounts => res.json(accounts))

    .catch(error =>
      res.status(500).json({ message: "Could not list accounts" })
    );
});

server.get("/api/accounts/", (req, res) => {
  db("accounts")
    .select("name", "budget")
    .then(accounts => {
      console.log(accounts);
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
});

server.get("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(response => {
      res
        .status(200)
        .json(response)
        .first();
    })
    .catch(error => {
      console.log(error).json(error);
    });
});

server.post("/api/accounts", (req, res) => {
  const account = req.body;
  if (!account.name || !account.budget) {
    res.status(400).json({ Hello: "Yeel" });
  } else {
    db("accounts")
      .insert(account)
      .then(account => {
        res.status(200).json(account);
      })
      .catch(error => {
        res.status(500).json({ err: error });
      });
  }
});

server.put("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
