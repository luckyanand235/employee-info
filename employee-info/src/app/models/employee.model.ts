import { Guid } from "guid-typescript";


export enum EmployeeType {
    fullStackDev = "Full-Stack Developer",
    seniorSoftwareDev = "Senior Software Developer",
    productDesigner = "Product Desinger",
    flutterDev = "Flutter Developer",
    qaTester = "QA Tester",
    productOwner = "Product Owner"
}

export interface Employee {
    employeeName: string,
    employeeType: EmployeeType | null,
    startDate: Date,
    endDate: Date | null
}
export interface EmployeeData {
    id: number,
    employeeData: Employee
}
export interface CalendarDialogData {
    date: Date;
    type?: string;
}



export interface EmployeeSave {
    employeeData: Employee,
    isNew: boolean
}
