import { repository } from "../shared/repository.js"
import { Receipt } from "./receiptsEntity.js"

const receipts : Receipt[] = [
    new Receipt(
        'Razon Social',
        12,
        1111.22,
        'Debito',
        'B',
        'FOIPI4-JShI-e59v-vA6Gm-OjmJ5'
    )
]

export class ReceiptRepository implements repository<Receipt>{
    public async findAll(): Promise <Receipt[] | undefined> {
        return await receipts
    }

    public async findOne(i: { id: string; }): Promise <Receipt | undefined> {
        return await receipts.find((receipt) => receipt.receiptId === i.id)
    }

    public async add(i: Receipt): Promise <Receipt | undefined> {
        await receipts.push(i)
        return i
    }

    public async update(i: Receipt): Promise <Receipt | undefined> {
        const index = await receipts.findIndex((receipt) => receipt.receiptId === i.receiptId)

        if (index !== -1) {
            receipts[index] = {...receipts[index], ...i}
        }

        return receipts[index]
    }

    public async delete(i: { id: string; }): Promise <Receipt | undefined> {
        const index = await receipts.findIndex((receipt) => receipt.receiptId === i.id)

        if (index!== -1) {
            const deletedReceipt = receipts.splice(index, 1)
            return deletedReceipt[0]
        }
    }
}