import { Router } from "express";   
import { getCustomers } from "../../controllers/Customer";

const customerRouter = Router()

customerRouter.get('/customers', getCustomers)

export {customerRouter}