const express = require("express");

const Users = require("./users-model");

const router = express.Router();

router.get("/", (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({
          errorMessage: "Database failed to get users. Contact your backend",
        });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Users.findUserById(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "There is no user with that id" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Failed to get user. Contact your backend" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findUserById(id)
    .then((user) => {
      if (user) {
        Users.updateUser(changes, id).then((updatedUser) => {
          res.json(updatedUser);
        });
      } else {
        res.status(404).json({ message: "No user with that id exists" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to update user. Contact your backend" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Users.removeUser(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "No user with that id exists" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Failed to delete user. Contact your backend" });
    });
});

router.get("/:id/students", (req, res) => {
  const { id } = req.params;

  Users.getStudentList(id)
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({
          errorMessage: "Database failed to get users. Contact your backend",
        });
    });
});

module.exports = router;
