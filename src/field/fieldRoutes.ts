import { Router } from "express"
import { sanitizeFieldInput, findAll, findOne, add, update, remove } from "./fieldController.js"

export const fieldRouter = Router()

fieldRouter.get('/', findAll)
fieldRouter.post('/', sanitizeFieldInput, add)
fieldRouter.get('/:fieldId', findOne)
fieldRouter.patch('/:fieldId', sanitizeFieldInput, update)
fieldRouter.delete('/:fieldId', remove)