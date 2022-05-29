import { Router } from "express";
import { categoryRouter } from "./Catergory";
import { gameRouter } from "./Game";
import { customerRouter } from "./Customer";

const router = Router()
router.use(categoryRouter )
router.use(gameRouter)
router.use(customerRouter)

export default router