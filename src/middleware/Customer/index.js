import { connection } from "../../db.js";
import { customerSchema } from "../../schemas/Customer/index.js";

async function validate(req, res, next) {
    const customer = req.body
    const validation = customerSchema.validate(customer)
    if (validation.error) return res.sendStatus(400)

    try {

        const result = await connection.query(`SELECT id 
                                               FROM customers 
                                               WHERE cpf=$1`, [customer.cpf])

        if (result.rowCount > 0) return res.sendStatus(409) //usuário já existe 

        const {id} = result[0]
        const existsCpf = await connection.query(`SELECT * 
                                              FROM customers 
                                              WHERE id != $1 AND cpf = $2`, [id, customer.cpf])

        if (existsCpf) return res.status(409).send('CPF já existe em outro usuário')
        
    } catch (error) {
        res.sendStatus(500)
        console.log(chalk.bold.red("Deu ruim para fazer a operação ", error))
    }

    next()
}

async function updateValidation (req, res, next) {
    const customer = req.body
    const {id} = req.params
  
    const validation = customerSchema.validate(customer);
  
    if (validation.error) return res.status(400).send(validation.error)
  
    try {
      const result = await connection.query(`SELECT * 
                                             FROM customers
                                             WHERE id = $1`, [id])
  
      if (result.rows === 0) return res.sendStatus(404) //usuário não existe 
  
      const cpfResult = await connection.query(`SELECT * 
                                                FROM customers 
                                                WHERE id != $1 AND cpf = $2`, [id, customer.cpf])
  
      if (cpfResult.rows > 0) return res.status(409).send('CPF já existe em outro usuário')
  
    } catch (error) {
      console.log('Deu erro ao verificar os usuários existentes', error);
      res.status(422).send(error);
    }
  
    next();
  }

export {validate, updateValidation }