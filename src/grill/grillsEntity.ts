import { ObjectId } from 'mongodb';
import crypto from 'node:crypto'

export class Grill{
    constructor(
        public avaible: boolean,
        public grillDimentions: string,
        public grillType: string,
        public grillId = crypto.randomUUID(),
        public grill_id = ObjectId
    ) {}
}