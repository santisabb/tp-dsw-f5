import crypto, { randomUUID } from 'crypto'

export class User {
    constructor(
        public userName: string,
        public userEmail: string,
        public userDni: string,
        public userPhone: string,
        public totalReserves: number,
        public userId = crypto.randomUUID()
    ) {}
}