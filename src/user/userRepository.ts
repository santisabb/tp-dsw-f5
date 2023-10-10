import { ObjectId } from "mongodb"
import { db } from "../shared/db/dbConnection.js"
import { repository } from "../shared/repository.js"
import { User } from "./usersEntity.js"

const usersArray : User[] = [
    new User(
        'Nombre de usuario',
        'usermail@mail.com',
        '12345678',
        'phone number',
        1,
        'VvT1-knoS9-m0oSLo-mKp4N-T69a'
    )
]

const users = db.collection<User>('users')

export class UserRepository implements repository<User>{
    public async findAll(): Promise <User[] | undefined> {
        return await users.find().toArray()
    }

    public async findOne(i: { id: string; }): Promise <User | undefined> {
        const _id = new ObjectId(i.id)
        return (await users.findOne({ _id })) || undefined
    }

    public async add(i: User): Promise <User | undefined> {
        await users.insertOne(i)
        return i
    }

    public async update(id: string, i: User): Promise <User | undefined> {
        const _id = new ObjectId(id)
        return (await users.findOneAndUpdate({ _id }, { $set:i}, { returnDocument: 'after'})) || undefined
    }

    public async delete(i: { id: string; }): Promise <User | undefined> {
        const _id = new ObjectId(i.id)
        return (await users.findOneAndDelete({ _id })) || undefined
    }
}