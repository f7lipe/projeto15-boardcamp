import { Router } from "express";   
import { getCustomers, getCustomerById, setCustomer, updateCustomer } from "../../controllers/Customer/index.js";
import { validate, updateValidation } from "../../middleware/Customer/index.js";

const customerRouter = Router()

customerRouter.get('/customers', getCustomers)
customerRouter.get('/customers/:id', getCustomerById)
customerRouter.post('/customers', validate, setCustomer)
customerRouter.put('/customers/:id', updateValidation, updateCustomer)

export {customerRouter}