import { connection } from "../../db.js";
import { rentalsSchema } from "../../schemas/Rental/index.js";

async function getRentals(req, res){
    const {customerId, gameId} = req.query;

    const query = `SELECT rentals.*, customers.id as "customerIdQ", customers.name as "customerName", games.id as "gameIdQ", games.name as "gameName", games."categoryId", categories.name as "categoryName"
                   FROM rentals JOIN customers ON customers.id = rentals."customerId"
                   JOIN games ON games.id = rentals."gameId"
                   JOIN categories ON games."categoryId" = categories.id
    `
  
    let rentals = ''
  
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
      console.log(chalk.bold.red('Erro ao pegar alugueis', error))
      res.status(422).send(error)
    }
}


function formatRentalResponse (rentalsArray) {
    return rentalsArray.map(rental => {
  
      const {id, 
             customerId, 
             gameId, 
             rentDate, 
             daysRented, 
             returnDate, 
             originalPrice, 
             delayFee, 
             customerIdQ, 
             customerName, 
             gameIdQ, 
             gameName, 
             categoryId, 
             categoryName} = rental
  
      const formattedDate = rentDate.toISOString().split('T')[0]
  
      return(
        {
          id, customerId, gameId,
          rentDate: formattedDate,
          daysRented, returnDate, originalPrice, delayFee,
          customer: {
            id: customerIdQ,
            name: customerName
          },
          game: {
            id: gameIdQ,
            name: gameName,
            categoryId, categoryName
          }
        }
      )
    })
  }


  export {getRentals}