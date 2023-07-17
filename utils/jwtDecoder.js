const jwt = require("jsonwebtoken");

const decodeJWT = (token) => {
  return jwt.decode(token, "secret_key");
};

module.exports = { decodeJWT };
