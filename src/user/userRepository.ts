import { repository } from "../shared/repository.js"
import { User } from "./usersEntity.js"

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

export class UserRepository implements repository<User>{
    public async findAll(): Promise <User[] | undefined> {
        return await users
    }

    public async findOne(i: { id: string; }): Promise <User | undefined> {
        return await users.find((users) => users.userId === i.id)
    }

    public async add(i: User): Promise <User | undefined> {
        await users.push(i)
        return i
    }

    public async update(i: User): Promise <User | undefined> {
        const userIdx = await users.findIndex((user) => user.userId === i.userId)

        if (userIdx !== -1){
            users[userIdx] = { ...users[userIdx], ...i}
        }

        return users[userIdx]
    }

    public async delete(i: { id: string; }): Promise <User | undefined> {
        const userIdx = await users.findIndex((user) => user.userId === i.id)

        if (userIdx !== -1){
            const deletedUser = users.splice(userIdx, 1)
            return deletedUser[0]
        }
    }
}