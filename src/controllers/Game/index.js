import chalk from "chalk";
import { connection } from "../../db.js";
import { gameSchema } from "../../schemas/Game/index.js";

async function getGames(req, res) {

    const { name } = req.query

    try {

        if (name) {
            const query = await connection.query(`
        SELECT games.*, categories.name as "categoryName" 
        FROM games
        JOIN categories 
        ON games."categoryId" = categories.id`)

            return res.send(query.rows)
        } else {

            const query = await connection.query(`
        SELECT games.*, categories.name as "categoryName" 
        FROM games
        JOIN categories 
        ON games."categoryId" = categories.id
        WHERE game.name
        ILIKE $1`, [`${name}`])

            return res.send(query.rows)
        }

    } catch (error) {
        res.sendStatus(500)
        console.log(chalk.red(error))
    }
}

export { getGames }