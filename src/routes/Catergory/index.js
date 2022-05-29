import { Router } from "express";
import { getCategories } from "../../controllers/Category";

const categoryRouter = Router()
categoryRouter.get('/categories', getCategories)


export {categoryRouter}