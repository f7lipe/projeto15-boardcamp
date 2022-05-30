import { Router } from "express";
import { getRentals, setRentals, returnRental } from "../../controllers/Rental/index.js";

const rentalRouter = Router()

rentalRouter.get('/rentals', getRentals)
rentalRouter.post('/rentals', setRentals)
rentalRouter.post('/rentals/:id/return', returnRental)

export { rentalRouter}