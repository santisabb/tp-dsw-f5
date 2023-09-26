import express, { NextFunction, Request, Response } from 'express'
import { Employee } from './employee/employeesEntity.js'
import { Grill } from './grill/grills.js'
import { Field } from './field/fields.js'
import { Receipt } from './receipt/receipts.js'
import { User } from './user/users.js'
import { EmployeeRepository } from './employee/employeeRepository.js'

const app = express()
const empRepo = new EmployeeRepository()

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
    res.json(users)
})


app.get('/api/receipts', (req, res) => {
    res.json(receipts)
})

app.get('/api/fields', (req, res) => {
    res.json(fields)
})

app.get('/api/grills', (req, res) => {
    res.json(grills)
})

app.get('/api/employees', (req, res) => {
    res.json({ data: empRepo.findAll() })
})

app.post('/api/users', sanitizeUserInput, (req, res) => {
    const input = req.body.sanitizedInput

    const user = new User(
        input.userName,
        input.userEmail,
        input.userDni,
        input.userPhone,
        input.totalReserves
    )

    users.push(user)

    return res.status(201).send({ message:'User added successfully'})
})

app.post('/api/receipts', sanitizeReceiptInput, (req, res) => {
    const input = req.body.sanitizedInput

    const receipt = new Receipt(
        input.registeredName,
        input.receiptNumber,
        input.amount,
        input.paymentMethod,
        input.receiptType
        )

    receipts.push(receipt)

    return res.status(201).send({ message:'Receipt added successfully'})
})

app.post('/api/fields', sanitizeFieldInput, (req, res) => {
    const input = req.body.sanitizedInput

    const field = new Field(input.maxPlayers, input.fieldDimentions, input.avaible, input.grassType)

    fields.push(field)

    return res.status(201).send({ message:'Field added successfully'})
})

app.post('/api/grills', sanitizeGrillInput,  (req, res) => {
    const input = req.body.sanitizedInput

    const grill = new Grill(
        input.avaible,
        input.grillDimentions,
        input.grillType
    )

    grills.push(grill)

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
    const user = users.find((users) => users.userId === req.params.userId)

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    }

    res.json({ data: user })
})

app.get('/api/receipts/:receiptId', (req, res) => {
    const receipt = receipts.find((receipt) => receipt.receiptId === req.params.receiptId)

    if(!receipt){
        return res.status(404).send({ message: 'Receipt not found'})
    }

    res.json({ data: receipt })
})

app.get('/api/grills/:grillId', (req, res) => {
    const grill = grills.find((grill) => grill.grillId === req.params.grillId)

    if(!grill){
        return res.status(404).send({ message: 'Grill not found'})
    }

    res.json({ data: grill })
})

app.get('/api/fields/:fieldId', (req, res) => {
    const field = fields.find((field) => field.fieldId === req.params.fieldId)

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
    const userIdx = users.findIndex((userIdx) => userIdx.userId === req.params.userId)

    if(userIdx === -1){
        return res.status(404).send({ message: 'User not found'})
    }

    users[userIdx] = { ...users[userIdx], ...req.body.sanitizedInput }

    return res.status(200).send({ message: 'User succefuly updated', data: users[userIdx] })
})

app.put('/api/receipts/:receiptId', sanitizeReceiptInput, (req, res) => {
    const receiptIdx = receipts.findIndex((receiptIdx) => receiptIdx.receiptId === req.params.receiptId)

    if(receiptIdx === -1){
        return res.status(404).send({ message: 'Receipt not found'})
    }

    receipts[receiptIdx] = { ...receipts[receiptIdx], ...req.body.sanitizedInput }

    return res.status(200).send({ message: 'Receipt successfully updated.', data: receipts[receiptIdx] })
})

app.put('/api/grills/:grillId', sanitizeGrillInput, (req, res) => {
    const grillIdx = grills.findIndex((grillIdx) => grillIdx.grillId === req.params.grillId)

    if(grillIdx === -1){
        return res.status(404).send({ message: 'Grill not found'})
    }

    grills[grillIdx] = {...grills[grillIdx],...req.body.sanitizedInput }

    return res.status(200).send({ message: 'Grill successfully updated.', data: grills[grillIdx] })    
})

app.put('/api/fields/:fieldId', sanitizeFieldInput, (req, res) => {
    const fieldIdx = fields.findIndex((fieldIdx) => fieldIdx.fieldId === req.params.fieldId)

    if(fieldIdx === -1){
        return res.status(404).send({ message: 'Field not found'})
    }

    fields[fieldIdx] = {...fields[fieldIdx],...req.body.sanitizedInput }

    return res.status(200).send({ message: 'Field successfully updated.', data: fields[fieldIdx] })
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
    const userIdx = users.findIndex((userIdx) => userIdx.userId === req.params.userId)

    if(userIdx === -1){
        return res.status(404).send({ message: 'User not found'})
    } else {
        users.splice(userIdx, 1)
        res.status(200).send({ message: 'User deleted successfully' })
    }
})

app.delete('/api/receipts/:receiptId', (req, res) => {
    const receiptIdx = receipts.findIndex((receiptIdx) => receiptIdx.receiptId === req.params.receiptId)
    
    if(receiptIdx === -1){
        return res.status(404).send({ message: 'Receipt not found'})
    } else{
        receipts.splice(receiptIdx, 1)
        res.status(200).send({ message: 'Receipt deleted successfully' })
    }
})

app.delete('/api/grills/:grillId', (req, res) => {
    const grillIdx = grills.findIndex((grillIdx) => grillIdx.grillId === req.params.grillId)

    if(grillIdx === -1){
        return res.status(404).send({ message: 'Grill deleted successfully' })
    } else{
        grills.splice(grillIdx, 1)
        res.status(200).send({ message: 'Grill deleted successfully' })
    }
})

app.delete('/api/fields/:fieldId', (req, res) => {
    const fieldIdx = fields.findIndex((fieldIdx) => fieldIdx.fieldId === req.params.fieldId)

    if(fieldIdx === -1){
        return res.status(404).send({ message: 'Field deleted successfully' })
    } else {
        fields.splice(fieldIdx, 1)
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