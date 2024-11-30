import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee, EmployeeSave, EmployeeType } from '../models/employee.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  private refreshEmployee: Subject<number> = new Subject<number>();

  sendRefresh(id: number) {
    this.refreshEmployee.next(id);
  }

  getRefresh(){
    return this.refreshEmployee.asObservable();
  }



}
