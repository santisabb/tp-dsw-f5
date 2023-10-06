import { Router } from "express"
import { sanitizeGrillInput, findAll, findOne, add, update, remove } from "./grillController.js"

export const grillRouter = Router()

grillRouter.get('/', findAll)
grillRouter.get('/:grillId', findOne)
grillRouter.post('/', sanitizeGrillInput, add)
grillRouter.patch('/:grillId', sanitizeGrillInput, update)
grillRouter.delete('/:grillId', remove)