const { Reflection } = require("../models");

class ReflectionController {
  static async createReflection(req, res) {}

  static async getReflectionByID(req, res) {}

  static async updateReflectionByID(req, res) {

    try {
      
      const {
        success, low_point, take_away
      } = req.body

      const reflection_id = req.params.id

      const userid = req.UserData.id

      if (!success || !low_point || !take_away) {
        throw {
          status : 400,
          message : "column cann't be empty !"
        }
      }

      const data = await Reflection.updateReflectionByID(success, low_point, take_away, reflection_id, userid);

      const response = {
        id : data.id,
        success : data.success,
        low_point : data.low_point,
        take_away : data.low_point,
        created_at : data.created_at,
        updated_at : data.updated_at
      }

      res.status(201).json(response)

    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message });
    }
    

  }

  static async deleteReflectionByID(req, res) {}
}
module.exports = ReflectionController;
