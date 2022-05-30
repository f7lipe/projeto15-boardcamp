import chalk from "chalk";
import { connection } from "../../db.js";
import { gameSchema } from "../../schemas/Game/index.js";

async function getGames(req, res) {

    const { name } = req.query

    try {

        if (!name) {
            const query = await connection.query(`
        SELECT games.*, categories.name as "categoryName" 
        FROM games
        JOIN categories 
        ON games."categoryId" = categories.id`)

            return res.send(query.rows)
        }

        const query = await connection.query(`
        SELECT games.*, categories.name as "categoryName" 
        FROM games
        JOIN categories 
        ON games."categoryId" = categories.id
        WHERE game.name
        ILIKE $1`, [`${name}`])

        return res.send(query.rows)
        

    } catch (error) {
        res.sendStatus(500)
        console.log(chalk.red(error))
    }
}

async function setGame(req, res){
    try {
        const game = req.body
        const validation = gameSchema.validate(game)
        if (validation.error) return res.sendStatus(400)
    
        const query = await connection.query(`SELECT id
                                               FROM categories 
                                               WHERE id=$1`, [game.categoryId])

        if (query.rowCount === 0) return res.sendStatus(400)
    
        await connection.query(`
          INSERT INTO 
            games(name, image, "stockTotal", "categoryId", "pricePerDay")
          VALUES ($1, $2, $3, $4, $5);
        `, [game.name, 
            game.image, 
            Number(game.stockTotal), 
            game.categoryId, 
            Number(game.pricePerDay)]);
    
        res.sendStatus(201)

      } catch (error) {
        res.sendStatus(500)
        console.log(chalk.red(error))
      }
}

export { getGames, setGame }