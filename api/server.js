const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const usersRouter = require("../users/users-router");
const loginRouter = require("../auth/auth-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", loginRouter);

server.use("/api/users", usersRouter);
// server.use('/api/students', studentsRouter);
// server.use('/api/projects', projectRouter);

// server.use('/api/reminders', reminderRouter)

server.get("/", (req, res) => {
  res.send("<h1>server is running</h1>");
});

module.exports = server;
