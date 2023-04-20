const jwt = require("jsonwebtoken");
const SECRET_KEY = "inirahasia";

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY, { maxAge: "1h" });
};

module.exports = {
  generateToken,
  verifyToken,
};
