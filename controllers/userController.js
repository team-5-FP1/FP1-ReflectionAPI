const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const db = require('../config/config')

class UserController {
  static async register(req, res) {
    try {
      const { email, password } = req.body
      let hashedPassword = hashPassword(password)
      
       db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword])

      const response = {
        email: email,
        password: password,
      }

    res.status(201).json(response)
    } catch (error) {
      res.status(400).json(error)
      console.log(error)
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      const data = await db.query("SELECT * FROM users WHERE email = $1", [email])

      if(data.rowCount === 0) {
        throw res.status(404).json("Email tidak terdaftar")
      }

      let passwordResponse = comparePassword(password, data.rows[0].password)    
      if(passwordResponse) {
          const payload = {
            id: data.rows[0].id,
            email: data.rows[0].email
          }
          
          const token = await generateToken(payload)
          return res.status(200).json({
            pesan: "Login berhasil",
            token: token
          })

        }
      
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = UserController;
