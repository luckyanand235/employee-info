import { Component } from '@angular/core';
import { Employee, EmployeeType } from 'src/app/models/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  employeeData: Employee = {
    employeeName: "Brain Walker",
    employeeType: EmployeeType.qaTester,
    startDate: new Date('2023-09-05'),
    endDate: new Date('2024-01-24')
  };

  getSelectedDate() {
    
  }
}
