import { Router } from "express";
import { categoryRouter } from "./Catergory/index.js";
import { gameRouter } from "./Game/index.js";
import { customerRouter } from "./Customer/index.js";
import { rentalRouter } from "./Rental/index.js";

const router = Router()
router.use(categoryRouter )
router.use(gameRouter)
router.use(customerRouter)
router.use(rentalRouter)

export default router