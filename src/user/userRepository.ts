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
    public findAll(): User[] | undefined {
        return users
    }

    public findOne(i: { id: string; }): User | undefined {
        return users.find((users) => users.userId === i.id)
    }

    public add(i: User): User | undefined {
        users.push(i)
        return i
    }

    public update(i: User): User | undefined {
        const userIdx = users.findIndex((user) => user.userId === i.userId)

        if (userIdx !== -1){
            users[userIdx] = { ...users[userIdx], ...i}
        }

        return users[userIdx]
    }

    public delete(i: { id: string; }): User | undefined {
        const userIdx = users.findIndex((user) => user.userId === i.id)

        if (userIdx !== -1){
            const deletedUser = users.splice(userIdx, 1)
            return deletedUser[0]
        }
    }
}