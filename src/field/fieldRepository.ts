import { repository } from "../shared/repository.js"
import { Field } from "./fieldsEntity.js"
import { db } from "../shared/db/dbConnection.js"
import { ObjectId } from "mongodb"

const fieldsArray : Field[] = [
    new Field(
        5,
        '10x15',
        true,
        'Natural',
        'BQB4oJhe-2ig5-2oTX-mGMl-pIz5'
    )
]

const fields = db.collection<Field>('fields')

export class FieldRepository implements repository<Field>{
    public async findAll(): Promise <Field[] | undefined> {
        return await fields.find().toArray()
    }

    public async findOne(i: { id: string; }): Promise <Field | undefined> {
        const _id = new ObjectId(i.id)
        return (await fields.findOne({ _id })) || undefined
}

    public async add(i: Field): Promise <Field | undefined> {
        await fields.insertOne(i)
        return i
    }

    public async update(id:string, i: Field): Promise <Field | undefined> {
        const _id = new ObjectId(id)
        return (await fields.findOneAndUpdate({ _id }, { $set: i}, { returnDocument: 'after'})) || undefined
    }

    public async delete(i: {id:string}): Promise <Field | undefined> {
        const _id = new ObjectId(i.id)
        return (await fields.findOneAndDelete({ _id })) || undefined
    }
}