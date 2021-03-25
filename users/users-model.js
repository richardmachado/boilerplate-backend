const db = require("../data/db-config");

module.exports = {
  getUsers,
  findUserById,
  updateUser,
  removeUser,
};

function getUsers() {
  return db.select("*").from("users");
}

function findUserById(id) {
  return db("users").where({ id }).first();
}

function updateUser(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findUserById(id);
      } else {
        return null;
      }
    });
}

function removeUser(id) {
  return db("users").where("id", id).del();
}
