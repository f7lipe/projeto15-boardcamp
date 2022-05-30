import { categorySchema } from "../../schemas/Category /index.js"; 
import { connection } from "../../db.js";

 async function validation(req, res, next) {

    const category = req.body
  
    const validation = categorySchema.validate(category)
    if (validation.error) return res.sendStatus(400)
  
    try {
      const result = await connection.query(`SELECT id 
                                             FROM categories 
                                             WHERE name=$1`, 
                                             [category.name])

      if (result.rowCount > 0) return res.sendStatus(409)
  
    } catch (error) {
      console.log('Deu ruim ao buscar a categoria', error);
      res.status(422).send('Menssagem do servidor: ', error);
    }

    next()
  }

  export { validation }