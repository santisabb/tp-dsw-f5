import { Router } from "express"
import { sanitizeReceiptInput, findAll, findOne, add, update, remove } from "./receiptController.js"

export const receiptRouter = Router()

receiptRouter.get('/', findAll)
receiptRouter.post('/', sanitizeReceiptInput, add)
receiptRouter.get('/:receiptId', findOne)
receiptRouter.patch('/:receiptId', sanitizeReceiptInput, update)
receiptRouter.delete('/:receiptId', remove)