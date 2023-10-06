import { Router } from "express"
import { sanitizeUserInput, findAll, findOne, add, update, remove } from "./userController.js"

export const userRouter = Router()

userRouter.get('/', findAll)
userRouter.post('/', sanitizeUserInput, add)
userRouter.get('/:userId', findOne)
userRouter.patch('/:userId', sanitizeUserInput, update)
userRouter.delete('/:userId', remove)