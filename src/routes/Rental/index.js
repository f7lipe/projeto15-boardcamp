import { Router } from "express";
import { getRentals, setRentals } from "../../controllers/Rental";

const rentalRouter = Router()

rentalRouter.get('/rentals', getRentals)
rentalRouter.post('/rentals', setRentals)

export { rentalRouter}