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
    public findAll(): Field[] | undefined {
        return fields
    }

    public findOne(i: { id: string; }): Field | undefined {
        return fields.find((field) => field.fieldId === i.id)
    }

    public add(i: Field): Field | undefined {
        fields.push(i)
        return i
    }

    public update(i: Field): Field | undefined {
        const index = fields.findIndex((field) => field.fieldId === i.fieldId)

        if(index!==-1){
            fields[index] = { ...fields[index], ...i }
        }

        return fields[index]
    }

    public delete(i: {id:string}): Field | undefined {
        const index = fields.findIndex((field) => field.fieldId === i.id)

        if(index!== -1){
            const deletedField = fields.splice(index, 1)
            return deletedField[0]
        }
    }
}