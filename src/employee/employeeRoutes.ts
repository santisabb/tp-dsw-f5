import { Router } from "express"
import { sanitizeEmployeeInput, findAll, findOne, add, update, remove } from "./employeeController.js"

export const employeeRouter = Router()

employeeRouter.get('/', findAll)
employeeRouter.post('/', sanitizeEmployeeInput, add)
employeeRouter.get('/:employeeId', findOne)
employeeRouter.patch('/:employeeId', sanitizeEmployeeInput, update)
employeeRouter.delete('/:employeeId', remove)