import crypto, { randomUUID } from 'crypto'
import { ObjectId } from 'mongodb';

export class User {
    constructor(
        public userName: string,
        public userEmail: string,
        public userDni: string,
        public userPhone: string,
        public totalReserves: number,
        public userId = crypto.randomUUID(),
        public user_id = ObjectId
    ) {}
}