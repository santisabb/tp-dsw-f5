import express, { NextFunction, Request, Response } from 'express'
import { ReceiptRepository } from './receiptRepository.js'
import { Receipt } from './receiptsEntity.js'

const receiptRepo = new ReceiptRepository()

function sanitizeReceiptInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        registeredName: req.body.registeredName,
        receiptNumber: req.body.receiptNumber,
        amount: req.body.amount,
        paymentMethod: req.body.paymentMethod,
        receiptType: req.body.receiptType,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request, res: Response){
    res.json({ data: await receiptRepo.findAll() })
}

async function findOne(req: Request, res: Response){
    const id = req.params.receiptId

    const receipt = await receiptRepo.findOne({ id })

    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    }

    res.json({ data: receipt })
}

async function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const receiptInput = new Receipt(
        input.registeredName,
        input.receiptNumber,
        input.amount,
        input.paymentMethod,
        input.receiptType
        )

    const receipt = await receiptRepo.add(receiptInput)

    return res.status(201).send({ message:'Receipt added successfully', data: receipt})
}

async function update(req: Request, res: Response) {
    req.body.sanitizedInput.receiptId = req.params.receiptId
    const receipt = await receiptRepo.update(req.params.receiptId, req.body.sanitizedInput)

    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    }

    return res.status(200).send({ message: 'Receipt successfully updated.', data: receipt })
}

async function remove(req: Request, res: Response) {
    const id = req.params.receiptId
    const receipt = await receiptRepo.delete({ id })
    
    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    } else{
        res.status(200).send({ message: 'Receipt deleted successfully' })
    }
}

export { sanitizeReceiptInput, findAll, findOne, add, update, remove}