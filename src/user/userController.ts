import express, { NextFunction, Request, Response } from 'express'
import { UserRepository } from './userRepository.js'
import { User } from './usersEntity.js'

const userRepo = new UserRepository()


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

async function findAll(req: Request, res: Response){
    res.json({ data: await userRepo.findAll() })
}

async function findOne(req: Request, res: Response){
    const id = req.params.userId

    const user = await userRepo.findOne({ id })

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    }

    res.json({ data: user })
}

async function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const userInput = new User(
        input.userName,
        input.userEmail,
        input.userDni,
        input.userPhone,
        input.totalReserves
    )

    const user = await userRepo.add(userInput)

    return res.status(201).send({ message:'User added successfully', data: user})
}

async function update(req: Request, res: Response){
    req.body.sanitizedInput.userId = req.params.userId
    const user = await userRepo.update(req.params.userId, req.body.sanitizedInput)

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    }

    return res.status(200).send({ message: 'User succefuly updated', data: user })
}

async function remove(req: Request, res: Response){
    const id = req.params.userId

    const user = await userRepo.delete({ id })

    if(!user){
        return res.status(404).send({ message: 'User not found'})
    } else {
        res.status(200).send({ message: 'User deleted successfully' })
    }
}

export { sanitizeUserInput, findAll, findOne, add, update, remove}