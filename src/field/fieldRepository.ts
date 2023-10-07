import { repository } from "../shared/repository.js"
import { Field } from "./fieldsEntity.js"

const fields : Field[] = [
    new Field(
        5,
        '10x15',
        true,
        'Natural',
        'BQB4oJhe-2ig5-2oTX-mGMl-pIz5'
    )
]

export class FieldRepository implements repository<Field>{
    public async findAll(): Promise <Field[] | undefined> {
        return await fields
    }

    public async findOne(i: { id: string; }): Promise <Field | undefined> {
        return await fields.find((field) => field.fieldId === i.id)
    }

    public async add(i: Field): Promise <Field | undefined> {
        await fields.push(i)
        return i
    }

    public async update(i: Field): Promise <Field | undefined> {
        const index = await fields.findIndex((field) => field.fieldId === i.fieldId)

        if(index!==-1){
            fields[index] = { ...fields[index], ...i }
        }

        return fields[index]
    }

    public async delete(i: {id:string}): Promise <Field | undefined> {
        const index = await fields.findIndex((field) => field.fieldId === i.id)

        if(index!== -1){
            const deletedField = fields.splice(index, 1)
            return deletedField[0]
        }
    }
}