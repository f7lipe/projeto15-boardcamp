import { connection } from "../../db.js";
import dayjs from "dayjs";
import chalk from "chalk";
import formatRentalResponse from "./formatRentalResponse.js";


async function getRentals(req, res){
    const {customerId, gameId} = req.query;

    const query = `SELECT rentals.*, customers.id as "customerIdQ", customers.name as "customerName", games.id as "gameIdQ", games.name as "gameName", games."categoryId", categories.name as "categoryName"
                   FROM rentals JOIN customers ON customers.id = rentals."customerId"
                   JOIN games ON games.id = rentals."gameId"
                   JOIN categories ON games."categoryId" = categories.id
    `
  
    let rentals = null
  
    try {
  
      if (!customerId && !gameId) rentals = await connection.query(query)
  
      if (customerId) rentals = await connection.query(`${query} WHERE customers.id = $1`, [customerId])
  
      if (gameId) rentals = await connection.query(`${query} WHERE games.id = $1`, [gameId])
  
      if (customerId && gameId) rentals = await connection.query(`${query} 
                                                                 WHERE customers.id = $1 
                                                                 AND games.id = $2`, [customerId, gameId])
  
      const rentalsFormatted = formatRentalResponse(rentals.rows)
  
      res.send(rentalsFormatted);
    } catch (error) {
      console.log(chalk.bold.red('Erro ao consultar aluguéis', error))
      res.status(422).send(error)
    }
}


async function setRentals(req, res){
    const {customerId, gameId, daysRented} = req.body

    const rentDate = dayjs().format('YYYY-MM-DD')
    
    try {
      const result = await connection.query(`SELECT * 
                                             FROM games 
                                             WHERE id = $1`, [gameId])
  
      const originalPrice = result.rows[0].pricePerDay * daysRented
  

  
      await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                      VALUES($1, $2, $3, $4, $5, $6, $7)
      `, [customerId, 
          gameId, 
          rentDate, 
          daysRented, 
          null, 
          originalPrice, 
          null])
  
      res.sendStatus(201);
  
      } catch (error) {
      console.log(chalk.bold.red('Deu ruim para cadastrar o aluguel', error))
      res.status(422).send(error)
    }
}

async function returnRental(req, res){
  const {id} = req.params

  const returnDate = dayjs().format('YYYY-MM-DD')

  try {
    const result = await connection.query(`SELECT * 
                                                 FROM rentals 
                                                 WHERE id = $1;`, [id])

    const milissecDifference = Math.abs(new Date(returnDate).getTime() - new Date(result.rows[0].rentDate).getTime())
    const daysDifference = milissecDifference/(1000 * 3600 * 24)

    let delayFee = 0

    if (daysDifference > result.rows[0].daysRented) {
      delayFee = daysDifference * (result.rows[0].originalPrice / result.rows[0].daysRented)
    }

    await connection.query(` UPDATE rentals
                             SET "returnDate" = $1, "delayFee" = $2
                             WHERE id = $3
    `, [returnDate, delayFee, id])

    res.sendStatus(200)
    console.log("devolvido com sucesso")

  } catch (error) {
    console.log('Deu ruim ao fechar a transação', error)
    res.status(422).send(error)
  }
}

async function deletRental(req, res){
  const {id} = req.params

  try {
    await connection.query(`DELETE FROM rentals 
                    WHERE id = $1`, [id])

    res.sendStatus(200)
    
  } catch (error) {
    console.log('Deu ruim ao deletar o aluguel', error)
    res.status(422).send(error)
  }
}
  export {getRentals, setRentals, returnRental, deletRental }
  
  
