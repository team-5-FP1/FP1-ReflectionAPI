const pool = require("../config/config");

class Reflection {

    static async updateReflectionByID(success, low_point, take_away, reflection_id, userid)
    {
        
        const query = {
         text : `update reflections set success = $1, low_point = $2, take_away = $3 where id = $4 and userid = $5 returning *`,  
         values : [success, low_point, take_away, reflection_id, userid]  
        }
        
        const { rows } = await pool.query(query)
        return rows[0]

    }

    static async createReflection(success, low_point, take_away, userid) {
        
        const query = {
            text: "INSERT INTO reflections(success, low_point, take_away, userid ) VALUES($1, $2, $3, $4) returning *",
            values: [success, low_point, take_away, userid]
        }
        console.log(query)

        const { rows } = await pool.query(query)
        return rows[0]
    }

    static async getReflectionByID(reflection_id) {
        const query = {
            text: "SELECT * FROM reflections WHERE id = $1",
            values: [reflection_id]
        }

        const { rows } = await pool.query(query)
        return rows[0]
    }

}

module.exports = Reflection;
