import { ObjectId } from "mongodb"
import { db } from "../shared/db/dbConnection.js"
import { repository } from "../shared/repository.js"
import { Receipt } from "./receiptsEntity.js"

const receiptsArray : Receipt[] = [
    new Receipt(
        'Razon Social',
        12,
        1111.22,
        'Debito',
        'B',
        'FOIPI4-JShI-e59v-vA6Gm-OjmJ5'
    )
]

const receipts = db.collection<Receipt>('receipts')

export class ReceiptRepository implements repository<Receipt>{
    public async findAll(): Promise <Receipt[] | undefined> {
        return await receipts.find().toArray()
    }

    public async findOne(i: { id: string; }): Promise <Receipt | undefined> {
        const _id = new ObjectId(i.id)
        return (await receipts.findOne({ _id })) || undefined
    }

    public async add(i: Receipt): Promise <Receipt | undefined> {
        await receipts.insertOne(i)
        return i
    }

    public async update(id: string, i: Receipt): Promise <Receipt | undefined> {
        const _id = new ObjectId(id)
        return (await receipts.findOneAndUpdate({ _id }, { $set: i }, { returnDocument: 'after'})) || undefined
    }

    public async delete(i: { id: string; }): Promise <Receipt | undefined> {
        const _id = new ObjectId(i.id)
        return (await receipts.findOneAndDelete({ _id })) || undefined
    }
}