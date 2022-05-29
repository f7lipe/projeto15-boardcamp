import { categorySchema } from "../../schemas/Category ";
import { connection } from "../../db.js";
import chalk from "chalk";

 async function getCategories(req, res) {
    try {
      const result = await connection.query(`SELECT * 
                                             FROM categories`);
      res.send(result.rows);
    } catch (error) {
      res.sendStatus(500);
      console.log(chalk.bold.red("Deu ruim para fazer a operação ", error))
    }
  }
  


  export {getCategories}