const pool = require("../config/config");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

class User {
  static async register(email, password) {
    const hashedPassword = await hashPassword(password);
    const query = {
      text: "INSERT INTO Users(email, password) VALUES($1, $2) RETURNING *",
      values: [email, hashedPassword],
    };

    const { rows } = await pool.query(query);
    return rows[0];
  }

  static async login(email, password) {
    const query = {
      text: "SELECT * FROM Users WHERE email = $1",
      values: [email],
    };

    const { rows } = await pool.query(query);
    const user = rows[0];

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  }

  static async findOne(id, email) {
    const query = {
      text: "select * from users where id = $1 and email = $2",
      values: [id, email],
    };

    const { rows } = await pool.query(query);
    const user = rows[0];

    return user;
  }
}

module.exports = User;
