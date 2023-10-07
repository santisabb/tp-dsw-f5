import { ObjectId } from 'mongodb';
import crypto from 'node:crypto'

export class Field{
    constructor(
        public maxPlayers: number,
        public fieldDimentions: string,
        public avaible: boolean,
        public grassType: string,
        public fieldId = crypto.randomUUID(),
        public field_id = ObjectId
    ) {}
}