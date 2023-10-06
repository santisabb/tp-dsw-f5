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

function findAll(req: Request, res: Response){
    res.json({ data: receiptRepo.findAll() })
}

function findOne(req: Request, res: Response){
    const id = req.params.receiptId

    const receipt = receiptRepo.findOne({ id })

    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    }

    res.json({ data: receipt })
}

function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const receiptInput = new Receipt(
        input.registeredName,
        input.receiptNumber,
        input.amount,
        input.paymentMethod,
        input.receiptType
        )

    const receipt = receiptRepo.add(receiptInput)

    return res.status(201).send({ message:'Receipt added successfully', data: receipt})
}

function update(req: Request, res: Response) {
    req.body.sanitizedInput.receiptId = req.params.receiptId
    const receipt = receiptRepo.update(req.body.sanitizedInput)

    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    }

    return res.status(200).send({ message: 'Receipt successfully updated.', data: receipt })
}

function remove(req: Request, res: Response) {
    const id = req.params.receiptId
    const receipt = receiptRepo.delete({ id })
    
    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    } else{
        res.status(200).send({ message: 'Receipt deleted successfully' })
    }
}

export { sanitizeReceiptInput, findAll, findOne, add, update, remove}