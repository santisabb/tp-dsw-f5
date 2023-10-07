import crypto, { randomUUID } from 'crypto'
import { ObjectId } from 'mongodb';

export class Receipt {
    constructor (
        public registeredName: string,
        public receiptNumber: number,
        public amount: number,
        public paymentMethod: string,
        public receiptType: string,
        public receiptId = crypto.randomUUID(),
        public receipt_id = ObjectId
    ) {}
}