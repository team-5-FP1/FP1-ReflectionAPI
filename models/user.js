const Pool = require(process.env.config)
class User {
    static async create(email, password) {
        const client = await Pool.connect()
        console.log(client);
        try {
            const result = await client.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING ", [email, password])
            return result.rows[0]

        } catch (error) {
            if(error) {
                console.log("database error");
            }
        }
    }
}

module.exports = User