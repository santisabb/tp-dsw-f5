import { repository } from "../shared/repository.js";
import { Employee } from "./employeesEntity.js";

const employees : Employee[] = [
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

export class EmployeeRepository implements repository<Employee>{
    public async findAll(): Promise <Employee[] | undefined> {
        return await employees
    }

    public async findOne(i: { id: string; }): Promise <Employee | undefined> {
        return await employees.find((employee) => employee.employeeId === i.id)
    }

    public async add(i: Employee): Promise <Employee | undefined> {
        await employees.push(i)
        return i
    }

    public async update(i: Employee): Promise <Employee | undefined> {
        const employeeIdx = await employees.findIndex((employee) => employee.employeeId === i.employeeId)

        if (employeeIdx!== -1) {
            employees[employeeIdx] = { ...employees[employeeIdx], ...i}
        }

        return employees[employeeIdx]
    }

    public async delete(i: { id: string; }): Promise <Employee | undefined> {
        const employeeIdx = await employees.findIndex((employee) => employee.employeeId === i.id)

        if(employeeIdx !== -1){
            const deletedEmployee = employees.splice(employeeIdx, 1)
            return deletedEmployee[0]
        }
    }
}