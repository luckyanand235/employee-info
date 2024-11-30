import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, EmployeeData, EmployeeType } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { IndexDbService } from 'src/app/service/index-db-service.service';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})

export class EmployeeDataComponent {
  
  @Input() i: number = -1;
  @Input() employeeData: EmployeeData = {
    id: 0,
    employeeData: {
      employeeName: "",
      employeeType: EmployeeType.fullStackDev,
      startDate: new Date(),
      endDate: new Date()
    }
  };

  swipedIndex: number | null = null;

  constructor(private indexDbService: IndexDbService, private router: Router,
    private employeeService: EmployeeService
  ) {}

  formatDate(date: Date) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
    return formattedDate;
  }

  onSwipeLeft(index: number) {
    this.swipedIndex = index;
  }

  getClass(i: number) {
    return 'swipe-data-' + i;
  }

  onSwipeRight(i: number) {
    this.swipedIndex = null;
  }

  deleteEmployee(id: number) {
    this.indexDbService.deleteEmployee(this.employeeData.id).subscribe(() => {
      this.swipedIndex = null;
      this.employeeService.sendRefresh(id);
    });
  }
}

