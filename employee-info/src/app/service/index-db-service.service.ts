import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { from, map, Observable, switchMap } from 'rxjs';
import { Employee, EmployeeData, EmployeeType } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {

  constructor(private dbService: NgxIndexedDBService) {}

  addItem(employee: Employee): Observable<any> {
    const employeeToStore = {
      ...employee,
      startDate: employee.startDate.toISOString(),
      endDate: employee.endDate ? employee.endDate.toISOString() : null
    };

    return this.dbService.add('employees', employeeToStore);
  }

  getAllEmployees(): Observable<EmployeeData[]> {
    return this.dbService.getAll('employees').pipe(
      map((rawEmployees: any[]) => rawEmployees.map(this.transformToEmployee))
    );
  }


  updateEmployee(id: number, updatedFields: Partial<Employee>): Observable<boolean> {
    return this.dbService.getByKey('employees', id).pipe(
      switchMap((employee: any) => {
        if (!employee) {
          throw new Error('Employee not found');
        }

        const updatedEmployee = {
          ...employee,
          ...updatedFields,
          startDate: updatedFields.startDate ? updatedFields.startDate.toISOString() : employee.startDate,
          endDate: updatedFields.endDate ? updatedFields.endDate.toISOString() : employee.endDate
        };

        return this.dbService.update('employees', updatedEmployee);
      })
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.dbService.delete('employees', id);
  }


  getEmployee(id: number): Observable<EmployeeData> {
    return this.dbService.getByKey('employees', id).pipe(
      map((rawEmployee: any) => this.transformToEmployee(rawEmployee))
    );
  }

  private transformToEmployee(rawEmployee: any): EmployeeData {
    return { 
      id: rawEmployee.id,
      employeeData: {
        employeeName: rawEmployee.employeeName,
        employeeType: rawEmployee.employeeType,
        startDate: new Date(rawEmployee.startDate),
        endDate: rawEmployee.endDate ? new Date(rawEmployee.endDate) : null
      }
    };
  }
}
