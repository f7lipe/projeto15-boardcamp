import { Router } from "express";
import { categoryRouter } from "./Catergory";

const router = Router()
router.use(categoryRouter )

export default router