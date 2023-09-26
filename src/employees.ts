import crypto from 'node:crypto'

export class Employee{
    constructor(
        public employeeName: string,
        public employeeEmail: string,
        public employeeCuil: string,
        public age: number,
        public ancient: number,
        public employeeStatus: boolean,
        public employeeId = crypto.randomUUID()
    ) {}
}