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
    public findAll(): Employee[] | undefined {
        return employees
    }

    public findOne(i: { id: string; }): Employee | undefined {
        return employees.find((employee) => employee.employeeId === i.id)
    }

    public add(i: Employee): Employee | undefined {
        employees.push(i)
        return i
    }

    public update(i: Employee): Employee | undefined {
        const employeeIdx = employees.findIndex((employee) => employee.employeeId === i.employeeId)

        if (employeeIdx!== -1) {
            employees[employeeIdx] = { ...employees[employeeIdx], ...i}
        }

        return employees[employeeIdx]
    }

    public delete(i: { id: string; }): Employee | undefined {
        const employeeIdx = employees.findIndex((employee) => employee.employeeId === i.id)

        if(employeeIdx !== -1){
            const deletedEmployee = employees.splice(employeeIdx, 1)
            return deletedEmployee[0]
        }
    }
}