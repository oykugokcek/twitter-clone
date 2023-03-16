const express = require("express");
const authRouter = require("./auth/auth-router");
const postsRouter = require("./posts/posts-router");
const usersRouter = require("./users/users-router");
const server = express();
const md = require("./auth/auth-middleware");

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/posts", postsRouter);
server.use("/api/users", md.checkRole("admin"), usersRouter);

//
// server.use("*", (req, res) => {
//   res.status(400).json({ message: `Not found` });
// });

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
