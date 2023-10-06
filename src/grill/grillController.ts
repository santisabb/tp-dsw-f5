import { Request, Response, NextFunction } from "express"
import { GrillRepository } from "./grillRepository.js"
import { Grill } from "./grillsEntity.js"

const grillRepo = new GrillRepository()


function sanitizeGrillInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        avaible: req.body.avaible,
        grillDimentions: req.body.grillDimentions,
        grillType: req.body.grillType
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })

    next()
}

function findAll(req: Request, res: Response){
    res.json({ data: grillRepo.findAll() })
}

function findOne(req: Request, res: Response){
    const id = req.params.grillId

    const grill = grillRepo.findOne( {id} )

    if(!grill){
        return res.status(404).send({ message: 'Grill not found'})
    }

    res.json({ data: grill })
}

function add(req: Request, res: Response){
    
    const input = req.body.sanitizedInput

    const grillInput = new Grill(
        input.avaible,
        input.grillDimentions,
        input.grillType
    )

    const grill = grillRepo.add(grillInput)

    return res.status(201).send({ message:'Grill added successfully'})
}

function update(req: Request, res: Response){
    req.body.sanitizedInput.grillId = req.params.grillId
    const grill = grillRepo.update(req.body.sanitizedInput)

    if(!grill){
        return res.status(404).send({ message: 'Grill not found'})
    }

    return res.status(200).send({ message: 'Grill successfully updated.', data: grill })  
}

function remove(req: Request, res: Response){
    const id = req.params.grillId
    const grill = grillRepo.delete({ id })

    if(!grill){
        return res.status(404).send({ message: 'Grill deleted successfully' })
    } else{
        res.status(200).send({ message: 'Grill deleted successfully' })
    }
}

export { sanitizeGrillInput, findAll, findOne, add, update, remove }