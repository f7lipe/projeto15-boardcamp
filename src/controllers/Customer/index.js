import { connection } from "../../db.js";
import chalk from "chalk";

async function getCustomers(req, res) {
    const { cpf } = req.query;

    try {
        if (cpf) {
            const customers = await connection.query(`SELECT * 
                                                      FROM customers 
                                                      WHERE cpf 
                                                      LIKE $1`, [`${cpf}%`])
            return res.send(customers.rows);
        }

        const customers = await connection.query(`SELECT * 
                                                  FROM customers`)
        return res.send(customers.rows)
    } catch (error) {
        res.sendStatus(500)
        console.log(chalk.bold.red("Deu ruim para fazer a operação ", error))
    }
}

async function getCustomerById(req, res) {
    const { id } = req.params;

    if (isNaN(parseInt(id))) return res.sendStatus(400)

    try {
        const customer = await connection.query(`SELECT * 
                                               FROM customers 
                                               WHERE id=$1`, [id])

        if (customer.rowCount === 0) return res.sendStatus(404)

        res.send(customer.rows[0])

    } catch (error) {
        res.sendStatus(500)
        console.log(chalk.bold.red("Deu ruim para fazer a operação ", error))
    }
}

async function setCustomer(req, res) {
    try {
        const customer = req.body;
        
        await connection.query(`
          INSERT INTO 
            customers (name, phone, cpf, birthday) 
            VALUES ($1, $2, $3, $4);
        `, [customer.name,
        customer.phone,
        customer.cpf,
        customer.birthday])

        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
        console.log(chalk.bold.red("Deu ruim para fazer a operação ", error))
    }
}

async function updateCustomer(req, res) {
    const { id } = req.params
    const { name, phone, cpf, birthday } = req.body

    if (isNaN(parseInt(id))) return res.sendStatus(400)
    
    try {
        const customer = await connection.query(`SELECT id 
                                               FROM customers 
                                               WHERE cpf=$1 
                                               AND id!=$2`, [cpf, id])
        
        if (customer.rowCount > 0) return res.sendStatus(409)
        

        await connection.query(`
      UPDATE customers
      SET 
        name = $1,
        phone = $2,
        cpf = $3,
        birthday = $4
      WHERE id = $5;
      `, [name,
            phone,
            cpf,
            birthday,
            id])

        res.sendStatus(200)
    } catch (error) {
        console.log(chalk.bold.red('Deu ruim para atualizar o cliente', error))
        res.status(422).send(error)
    }
}

export { getCustomers, getCustomerById, setCustomer, updateCustomer }