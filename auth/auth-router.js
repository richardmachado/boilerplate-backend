const express = require("express");
const bcrypt = require("bcryptjs");

const API = require("./auth-model");
const signToken = require("../helpers/signToken");

const router = express.Router();

router.post("/register", (req, res, next) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 10);

  credentials.password = hash;

  API.addUser(credentials)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      console.log("Error registering user.", err);
      res.status(500).json({ error: "Error registering user." });
    });
});

router.post("/login", (req, res, next) => {
  const credentials = req.body;
  const username = credentials.username;
  const password = credentials.password;

  API.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        //sign token

        const token = signToken(user);

        //send the token
        res.status(200).json({
          token,
          message: `Welcome ${user.username}!`,
          id: user.id,
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch((error) => {
      console.log("Error with login", error);
      res.status(500).json({ error: "Problem with login." });
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send("error logging out");
      } else {
        res.send("byeeee");
      }
    });
  }
});

module.exports = router;
