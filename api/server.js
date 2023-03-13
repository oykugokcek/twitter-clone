const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server ayaktadır." });
});

server.use("*", (req, res) => {
  res.status(400).json({ message: `Not found` });
});

module.exports = server;
