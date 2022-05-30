import { Router } from "express";
import { categoryRouter } from "./Catergory";
import { gameRouter } from "./Game";
import { customerRouter } from "./Customer";
import { rentalRouter } from "./Rental";

const router = Router()
router.use(categoryRouter )
router.use(gameRouter)
router.use(customerRouter)
router.use(rentalRouter)

export default router