import { Router } from "express";
import { getRentals } from "../../controllers/Rental";

const rentalRouter = Router()

rentalRouter.get('/rentals', getRentals)

export { rentalRouter}