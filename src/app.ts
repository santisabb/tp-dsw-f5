import express, { NextFunction, Request, Response } from 'express'
import { User } from './user/usersEntity.js'
import { UserRepository } from './user/userRepository.js'
import { employeeRouter } from './employee/employeeRoutes.js'
import { fieldRouter } from './field/fieldRoutes.js'
import { grillRouter } from './grill/grillRoutes.js'
import { receiptRouter } from './receipt/receiptRouter.js'
import { userRouter } from './user/userRouter.js'

const app = express()
const userRepo = new UserRepository()

app.use(express.json())

app.use('/api/employees', employeeRouter)
app.use('/api/fields', fieldRouter)
app.use('/api/grills', grillRouter)
app.use('/api/receipts', receiptRouter)
app.use('/api/users', userRouter)

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

app.delete('/api/users/:userId', (req, res) => {
    const id = req.params.userId

    const user = userRepo.delete({ id })

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    } else {
        res.status(200).send({ message: 'User deleted successfully' })
    }
})

app.use((_, res) => {
    res.status(404).send({ message: 'Resource not found' })
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})