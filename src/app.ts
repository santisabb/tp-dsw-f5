import express, { NextFunction, Request, Response } from 'express'
import { Employee } from './employee/employeesEntity.js'
import { Grill } from './grill/grillsEntity.js'
import { Field } from './field/fieldsEntity.js'
import { Receipt } from './receipt/receiptsEntity.js'
import { User } from './user/usersEntity.js'
import { EmployeeRepository } from './employee/employeeRepository.js'
import { FieldRepository } from './field/fieldRepository.js'
import { GrillRepository } from './grill/grillRepository.js'
import { ReceiptRepository } from './receipt/receiptRepository.js'
import { UserRepository } from './user/userRepository.js'

const app = express()
const empRepo = new EmployeeRepository()
const fieldRepo = new FieldRepository()
const grillRepo = new GrillRepository()
const recptRepo = new ReceiptRepository()
const userRepo = new UserRepository()

app.use(express.json())

const employees : Employee[] = [
    new Employee(
        'Nombre',
        'email@unmail.com',
        '1-23456789-0',
        22,
        0,
        true,
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    )
]

const grills : Grill[] = [
    new Grill(
        true,
        '3x2',
        'Gas grill',
        'ZhHpT-xTXQD-gixhh-hifm-uSC6G'
    )
]

const fields : Field[] = [
    new Field(
        5,
        '10x15',
        true,
        'Natural',
        'BQB4oJhe-2ig5-2oTX-mGMl-pIz5'
    )
]

const receipts : Receipt[] = [
    new Receipt(
        'Razon Social',
        12,
        1111.22,
        'Debito',
        'B',
        'FOIPI4-JShI-e59v-vA6Gm-OjmJ5'
    )
]

const users : User[] = [
    new User(
        'Nombre de usuario',
        'usermail@mail.com',
        '12345678',
        'phone number',
        1,
        'VvT1-knoS9-m0oSLo-mKp4N-T69a'
    )
]

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

function sanitizeReceiptInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        registeredName: req.body.registeredName,
        receiptNumber: req.body.receiptNumber,
        amount: req.body.amount,
        receiptType: req.body.receiptType,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userDni: req.body.userDni,
        userPhone: req.body.userPhone,
        totalReserves: req.body.totalReserves,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

app.get('/api/users', (req, res) => {
    res.json({ data: userRepo.findAll() })
})


app.get('/api/receipts', (req, res) => {
    res.json({ data: recptRepo.findAll() })
})

app.get('/api/fields', (req, res) => {
    res.json({ data: fieldRepo.findAll() })
})

app.get('/api/grills', (req, res) => {
    res.json({ data: grillRepo.findAll() })
})

app.get('/api/employees', (req, res) => {
    res.json({ data: empRepo.findAll() })
})

app.post('/api/users', sanitizeUserInput, (req, res) => {
    const input = req.body.sanitizedInput

    const userInput = new User(
        input.userName,
        input.userEmail,
        input.userDni,
        input.userPhone,
        input.totalReserves
    )

    const user = userRepo.add(userInput)

    return res.status(201).send({ message:'User added successfully'})
})

app.post('/api/receipts', sanitizeReceiptInput, (req, res) => {
    const input = req.body.sanitizedInput

    const receiptInput = new Receipt(
        input.registeredName,
        input.receiptNumber,
        input.amount,
        input.paymentMethod,
        input.receiptType
        )

    const receipt = recptRepo.add(receiptInput)

    return res.status(201).send({ message:'Receipt added successfully', data: receipt})
})

app.post('/api/fields', sanitizeFieldInput, (req, res) => {
    const input = req.body.sanitizedInput

    const fieldInput = new Field(input.maxPlayers, input.fieldDimentions, input.avaible, input.grassType)

    const field = fieldRepo.add(fieldInput)

    return res.status(201).send({ message:'Field added successfully', data: field})
})

app.post('/api/grills', sanitizeGrillInput,  (req, res) => {
    const input = req.body.sanitizedInput

    const grillInput = new Grill(
        input.avaible,
        input.grillDimentions,
        input.grillType
    )

    const grill = grillRepo.add(grillInput)

    return res.status(201).send({ message:'Grill added successfully'})
})

app.post('/api/employees', sanitizeEmployeeInput, (req, res) => {
    const input = req.body.sanitizedInput

    const employeeInput = new Employee(
        input.employeeName, 
        input.employeeEmail, 
        input.employeeCuil, 
        input.age, 
        input.ancient, 
        input.employeeStatus
        )

    const employee = empRepo.add(employeeInput)

    return res.status(201).send({ message:'Employee added successfully', data: employee})
})

app.get('/api/users/:userId', (req, res) => {
    const id = req.params.userId

    const user = userRepo.findOne({ id })

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    }

    res.json({ data: user })
})

app.get('/api/receipts/:receiptId', (req, res) => {
    const id = req.params.receiptId

    const receipt = recptRepo.findOne({ id })

    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    }

    res.json({ data: receipt })
})

app.get('/api/grills/:grillId', (req, res) => {
    const id = req.params.grillId

    const grill = grillRepo.findOne( {id} )

    if(!grill){
        return res.status(404).send({ message: 'Grill not found'})
    }

    res.json({ data: grill })
})

app.get('/api/fields/:fieldId', (req, res) => {
    const id = req.params.fieldId

    const field = fieldRepo.findOne({ id })

    if(!field){
        return res.status(404).send({ message: 'Field not found'})
    }

    res.json({ data: field })
})

app.get('/api/employees/:employeeId', (req, res) => {
    const id = req.params.employeeId

    const employee = empRepo.findOne({ id })

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    }

    res.json({ data: employee })
})

app.put('/api/users/:userId', sanitizeUserInput, (req, res) => {
    req.body.sanitizedInput.userId = req.params.userId
    const user = userRepo.update(req.body.sanitizedInput)

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    }

    return res.status(200).send({ message: 'User succefuly updated', data: user })
})

app.put('/api/receipts/:receiptId', sanitizeReceiptInput, (req, res) => {
    req.body.sanitizedInput.receiptId = req.params.receiptId
    const receipt = recptRepo.update(req.body.sanitizedInput)

    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    }

    return res.status(200).send({ message: 'Receipt successfully updated.', data: receipt })
})

app.put('/api/grills/:grillId', sanitizeGrillInput, (req, res) => {
    req.body.sanitizedInput.grillId = req.params.grillId
    const grill = grillRepo.update(req.body.sanitizedInput)

    if(!grill){
        return res.status(404).send({ message: 'Grill not found'})
    }

    return res.status(200).send({ message: 'Grill successfully updated.', data: grill })    
})

app.put('/api/fields/:fieldId', sanitizeFieldInput, (req, res) => {
    req.body.sanitizedInput.fieldId = req.params.fieldId
    const field = fieldRepo.update(req.body.sanitizedInput)

    if(!field){
        return res.status(404).send({ message: 'Field not found'})
    }

    return res.status(200).send({ message: 'Field successfully updated.', data: field })
})

app.put('/api/employees/:employeeId', sanitizeEmployeeInput, (req, res) => {
    req.body.sanitizedInput.employeeId = req.params.employeeId
    const employee = empRepo.update(req.body.sanitizedInput)

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    }

    return res.status(200).send({ message: 'Employee successfully updated.', data: employee })
})

app.delete('/api/users/:userId', (req, res) => {
    const id = req.params.userId

    const user = userRepo.delete({ id })

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    } else {
        res.status(200).send({ message: 'User deleted successfully' })
    }
})

app.delete('/api/receipts/:receiptId', (req, res) => {
    const id = req.params.receiptId
    const receipt = recptRepo.delete({ id })
    
    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    } else{
        res.status(200).send({ message: 'Receipt deleted successfully' })
    }
})

app.delete('/api/grills/:grillId', (req, res) => {
    const id = req.params.grillId
    const grill = grillRepo.delete({ id })

    if(!grill){
        return res.status(404).send({ message: 'Grill deleted successfully' })
    } else{
        res.status(200).send({ message: 'Grill deleted successfully' })
    }
})

app.delete('/api/fields/:fieldId', (req, res) => {
    const id = req.params.fieldId
    const field = fieldRepo.delete({ id })

    if(!field){
        return res.status(404).send({ message: 'Field deleted successfully' })
    } else {
        res.status(200).send({ message: 'Field deleted successfully' })
    }
})

app.delete('/api/employees/:employeeId', (req, res) => {
    const id = req.params.employeeId
    const employee = empRepo.delete({ id })

    if(!employee){
        return res.status(404).send({ message: 'Employee not found'})
    } else {
        res.status(200).send({ message: 'Employee deleted successfully' })
    }
})

app.use((_, res) => {
    res.status(404).send({ message: 'Resource not found' })
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})