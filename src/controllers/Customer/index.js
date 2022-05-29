import { connection } from "../../db.js";
import { customerSchema } from "../../schemas/Customer";
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

export { getCustomers }