const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw {
        code: 401,
        message: "Token not provided!",
      };
    }

    const decode = verifyToken(access_token);

    console.log(decode, "<< decode token");

    const user = await User.findOne(decode.id, decode.email);

    if (!user) {
      throw {
        code: 401,
        message: "User not found",
      };
    }

    req.UserData = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(error?.code || 500).json(error);
  }
};

module.exports = authentication;
