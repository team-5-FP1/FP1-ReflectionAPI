const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res) {}

  static async login(req, res) {}
}
module.exports = UserController;
