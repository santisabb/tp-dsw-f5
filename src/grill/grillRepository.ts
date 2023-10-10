import { ObjectId } from "mongodb"
import { db } from "../shared/db/dbConnection.js"
import { repository } from "../shared/repository.js"
import { Grill } from "./grillsEntity.js"

const grillsArray : Grill[] = [
    new Grill(
        true,
        '3x2',
        'Gas grill',
        'ZhHpT-xTXQD-gixhh-hifm-uSC6G'
    )
]

const grills = db.collection<Grill>('grills')

export class GrillRepository implements repository<Grill>{
    public async findAll(): Promise <Grill[] | undefined> {
        return await grills.find().toArray()
    }

    public async findOne(i: { id: string; }): Promise <Grill | undefined> {
        const _id = new ObjectId(i.id)
        return (await grills.findOne({ _id })) || undefined  
    }

    public async add(i: Grill): Promise <Grill | undefined> {
        await grills.insertOne(i)
        return i
    }

    public async update(id: string, i: Grill): Promise <Grill | undefined> {
        const _id = new ObjectId(id)
        return (await grills.findOneAndUpdate({ _id }, { $set: i}, { returnDocument: 'after' })) || undefined
    }

    public async delete(i: { id: string; }): Promise <Grill | undefined> {
        const _id = new ObjectId(i.id)
        return (await grills.findOneAndDelete({ _id })) || undefined
    }
}