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

}

module.exports = Reflection;
