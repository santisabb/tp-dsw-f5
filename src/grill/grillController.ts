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

async function findAll(req: Request, res: Response){
    res.json({ data: await grillRepo.findAll() })
}

async function findOne(req: Request, res: Response){
    const id = req.params.grillId

    const grill = await grillRepo.findOne( {id} )

    if(!grill){
        return res.status(404).send({ message: 'Grill not found'})
    }

    res.json({ data: grill })
}

async function add(req: Request, res: Response){
    
    const input = req.body.sanitizedInput

    const grillInput = new Grill(
        input.avaible,
        input.grillDimentions,
        input.grillType
    )

    const grill = await grillRepo.add(grillInput)

    return res.status(201).send({ message:'Grill added successfully'})
}

async function update(req: Request, res: Response){
    req.body.sanitizedInput.grillId = req.params.grillId
    const grill = await grillRepo.update(req.params.grillId, req.body.sanitizedInput)

    if(!grill){
        return res.status(404).send({ message: 'Grill not found'})
    }

    return res.status(200).send({ message: 'Grill successfully updated.', data: grill })  
}

async function remove(req: Request, res: Response){
    const id = req.params.grillId
    const grill = await grillRepo.delete({ id })

    if(!grill){
        return res.status(404).send({ message: 'Grill deleted successfully' })
    } else{
        res.status(200).send({ message: 'Grill deleted successfully' })
    }
}

export { sanitizeGrillInput, findAll, findOne, add, update, remove }