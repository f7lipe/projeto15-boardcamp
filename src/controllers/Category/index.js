import { categorySchema } from "../../schemas/Category /index.js";
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
  
   async function setCategory(req, res) {
    try {
      const category = req.body;
      const validation = categorySchema.validate(category);
      if (validation.error) {
        return res.sendStatus(400);
      }
  
      const result = await connection.query(`SELECT id 
                                             FROM categories 
                                             WHERE name=$1`, 
                                             [category.name]);
      if (result.rowCount > 0) {
        return res.sendStatus(409);
      }
  
      await connection.query(`INSERT INTO categories(name) 
                              VALUES ($1)`, 
                              [category.name]);
  
      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(500);
      console.log(chalk.bold.red("Deu ruim para fazer a operação ", error))
    }
  }

  export {getCategories, setCategory}