const express = require("express");
const authRouter = require("./auth/auth-router");
const postsRouter = require("./posts/posts-router");
const usersRouter = require("./users/users-router");
const server = express();

server.use("/api/auth", authRouter);
server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server ayaktadır." });
});

server.use("*", (req, res) => {
  res.status(400).json({ message: `Not found` });
});

module.exports = server;
