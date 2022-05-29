import { Router } from "express";
import { categoryRouter } from "./Catergory";
import { gameRouter } from "./Game";

const router = Router()
router.use(categoryRouter )
router.use(gameRouter)

export default router