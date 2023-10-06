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

function findAll(req: Request, res: Response){
    res.json({ data: employeeRepo.findAll() })
}

function findOne(req: Request, res: Response){
    const id = req.params.employeeId

    const employee = employeeRepo.findOne({ id })

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    }

    res.json({ data: employee })
}

function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const employeeInput = new Employee(
        input.employeeName, 
        input.employeeEmail, 
        input.employeeCuil, 
        input.age, 
        input.ancient, 
        input.employeeStatus
        )

    const employee = employeeRepo.add(employeeInput)

    return res.status(201).send({ message:'Employee added successfully', data: employee})
}

function update(req: Request, res: Response){
    req.body.sanitizedInput.employeeId = req.params.employeeId
    const employee = employeeRepo.update(req.body.sanitizedInput)

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    }

    return res.status(200).send({ message: 'Employee successfully updated.', data: employee })
}

function remove(req: Request, res: Response){
    const id = req.params.employeeId
    const employee = employeeRepo.delete({ id })

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    } else {
        res.status(200).send({ message: 'Employee deleted successfully' })
    }
}

export { sanitizeEmployeeInput, findAll, findOne, add, update, remove}