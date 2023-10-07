import { Request, Response, NextFunction } from "express"
import { EmployeeRepository } from "./employeeRepository.js"
import { Employee } from "./employeesEntity.js"

const employeeRepo = new EmployeeRepository()

function sanitizeEmployeeInput(req: Request, res:Response, next: NextFunction){
    req.body.sanitizedInput = {
        employeeName: req.body.employeeName,
        employeeEmail: req.body.employeeEmail,
        employeeCuil: req.body.employeeCuil,
        age: req.body.age,
        ancient: req.body.ancient,
        employeeStatus: req.body.employeeStatus,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request, res: Response){
    res.json({ data: await employeeRepo.findAll() })
}

async function findOne(req: Request, res: Response){
    const id = req.params.employeeId

    const employee = await employeeRepo.findOne({ id })

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    }

    res.json({ data: employee })
}

async function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const employeeInput = new Employee(
        input.employeeName, 
        input.employeeEmail, 
        input.employeeCuil, 
        input.age, 
        input.ancient, 
        input.employeeStatus
        )

    const employee = await employeeRepo.add(employeeInput)

    return res.status(201).send({ message:'Employee added successfully', data: employee})
}

async function update(req: Request, res: Response){
    req.body.sanitizedInput.employeeId = req.params.employeeId
    const employee = await employeeRepo.update(req.body.sanitizedInput)

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    }

    return res.status(200).send({ message: 'Employee successfully updated.', data: employee })
}

async function remove(req: Request, res: Response){
    const id = req.params.employeeId
    const employee = await employeeRepo.delete({ id })

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    } else {
        res.status(200).send({ message: 'Employee deleted successfully' })
    }
}

export { sanitizeEmployeeInput, findAll, findOne, add, update, remove}