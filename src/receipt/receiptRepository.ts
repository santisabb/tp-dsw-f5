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
    public findAll(): Receipt[] | undefined {
        return receipts
    }

    public findOne(i: { id: string; }): Receipt | undefined {
        return receipts.find((receipt) => receipt.receiptId === i.id)
    }

    public add(i: Receipt): Receipt | undefined {
        receipts.push(i)
        return i
    }

    public update(i: Receipt): Receipt | undefined {
        const index = receipts.findIndex((receipt) => receipt.receiptId === i.receiptId)

        if (index !== -1) {
            receipts[index] = {...receipts[index], ...i}
        }

        return receipts[index]
    }

    public delete(i: { id: string; }): Receipt | undefined {
        const index = receipts.findIndex((receipt) => receipt.receiptId === i.id)

        if (index!== -1) {
            const deletedReceipt = receipts.splice(index, 1)
            return deletedReceipt[0]
        }
    }
}