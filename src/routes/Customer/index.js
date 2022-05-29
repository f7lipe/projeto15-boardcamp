import { Router } from "express";   
import { getCustomers, getCustomerById } from "../../controllers/Customer";

const customerRouter = Router()

customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id', getCustomerById)

export {customerRouter}