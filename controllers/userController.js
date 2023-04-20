const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw {
          status: 400,
          message: "Email and password are required",
        };
      }

      if (password.length < 6) {
        throw {
          status: 400,
          message: "Password must be at least 6 characters long",
        };
      }

      const data = await User.register(email, password);

      const response = {
        id: data.id,
        email: data.email,
      };

      const token = generateToken({ email: data.email });
      response.token = token;

      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);

      const payload = { id: user.id, email: user.email };
      const access_token = generateToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
