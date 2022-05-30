import { Router } from "express";   
import { getCustomers, getCustomerById, setCustomer, updateCustomer } from "../../controllers/Customer/index.js";

const customerRouter = Router()

customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id', getCustomerById)
customerRouter.post('/customers', setCustomer)
customerRouter.put('/customers', updateCustomer)

export {customerRouter}