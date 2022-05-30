import { Router } from "express";
import { getCategories, setCategory } from "../../controllers/Category/index.js";
import { validation } from "../../middleware/Category/index.js";

const categoryRouter = Router()
categoryRouter.get('/categories', getCategories)
categoryRouter.post('/categories', validation,  setCategory)

export {categoryRouter}