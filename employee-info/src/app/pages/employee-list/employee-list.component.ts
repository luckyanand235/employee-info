import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeData, EmployeeType } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { IndexDbService } from 'src/app/service/index-db-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent{

  currEmployeeList: EmployeeData[] = [];
  prevEmployeeList: EmployeeData[] = [];

  constructor(private router: Router, public employeeService: EmployeeService, 
    private indexedDbService: IndexDbService) {
      this.employeeService.getRefresh().subscribe((x) => {
        this.currEmployeeList = [];
        this.prevEmployeeList = [];
        this.getAllEmployee();
      })
      this.getAllEmployee();
    
  }

  getAllEmployee() {
    this.indexedDbService.getAllEmployees().subscribe((x) => {
      x.forEach((employee : EmployeeData) => {
        if(employee.employeeData.endDate == null) {
          this.currEmployeeList.push(employee);
        } else {
          this.prevEmployeeList.push(employee);
        }
      })
    });
  }

  addEmployee() {
    this.router.navigate(['/employee/create'],)
  }

  

}
