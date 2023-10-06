import { Response, Request, NextFunction } from "express"
import { FieldRepository } from "./fieldRepository.js"
import { Field } from "./fieldsEntity.js"

const fieldRepo = new FieldRepository()


function sanitizeFieldInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        maxPlayers: req.body.maxPlayers,
        fieldDimentions: req.body.fieldDimentions,
        avaible: req.body.avaible,
        grassType: req.body.grassType,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

function findAll(req: Request, res: Response){
    res.json({ data: fieldRepo.findAll() })
}

function findOne(req: Request, res: Response){
    const id = req.params.fieldId

    const field = fieldRepo.findOne({ id })

    if(!field){
        return res.status(404).send({ message: 'Field not found'})
    }

    res.json({ data: field })
}

function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const fieldInput = new Field(input.maxPlayers, input.fieldDimentions, input.avaible, input.grassType)

    const field = fieldRepo.add(fieldInput)

    return res.status(201).send({ message:'Field added successfully', data: field})
}

function update(req: Request, res: Response){
    req.body.sanitizedInput.fieldId = req.params.fieldId
    const field = fieldRepo.update(req.body.sanitizedInput)

    if(!field){
        return res.status(404).send({ message: 'Field not found'})
    }

    return res.status(200).send({ message: 'Field successfully updated.', data: field })
}

function remove(req: Request, res: Response){
    const id = req.params.fieldId
    const field = fieldRepo.delete({ id })

    if(!field){
        return res.status(404).send({ message: 'Field deleted successfully' })
    } else {
        res.status(200).send({ message: 'Field deleted successfully' })
    }
}

export { sanitizeFieldInput, findAll, findOne, add, update, remove}