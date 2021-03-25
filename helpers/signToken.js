const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../secrets/secret");

module.exports = function signToken(user) {
  const payload = {
    username: user.username,
    userId: user.id,
  };

  const options = {
    expiresIn: "1hr",
  };

  return jwt.sign(payload, jwtSecret, options);
};
