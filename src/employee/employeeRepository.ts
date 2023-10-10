import { ObjectId } from "mongodb";
import { db } from "../shared/db/dbConnection.js";
import { repository } from "../shared/repository.js";
import { Employee } from "./employeesEntity.js";

const employeesArray : Employee[] = [
    new Employee(
        'Nombre',
        'email@unmail.com',
        '1-23456789-0',
        22,
        0,
        true,
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    )
]

const employees = db.collection<Employee>('employees')

export class EmployeeRepository implements repository<Employee>{
    public async findAll(): Promise <Employee[] | undefined> {
        return await employees.find().toArray()
    }

    public async findOne(i: { id: string; }): Promise <Employee | undefined> {
        const _id = new ObjectId(i.id)
        return (await employees.findOne({ _id })) || undefined
        }

    public async add(i: Employee): Promise <Employee | undefined> {
        await employees.insertOne(i)
        return i
    }

    public async update(id: string, i: Employee): Promise <Employee | undefined> {
        const _id = new ObjectId(id)
        return (await employees.findOneAndUpdate({ _id }, { $set: i }, { returnDocument:'after'})) || undefined
    }

    public async delete(i: { id: string; }): Promise <Employee | undefined> {
        const _id = new ObjectId(i.id)
        return (await employees.findOneAndDelete({ _id })) || undefined
    }
}