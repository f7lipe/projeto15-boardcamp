export default function formatRentalResponse (rentalsArray) {
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
