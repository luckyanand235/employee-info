import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { CalendarDialogData, Employee, EmployeeData, EmployeeSave, EmployeeType } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { IndexDbService } from 'src/app/service/index-db-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  startDateString = 'Today';
  endDateString = 'No Date';

  empId: number = -1;

  @Input() isNewEmoloyee: boolean = false;
  employeeData: Employee = {
    employeeName: '',
    employeeType: null,
    startDate: new Date(),
    endDate: null
  };

  employeeTypes: EmployeeType[] = [
    EmployeeType.flutterDev,
    EmployeeType.fullStackDev,
    EmployeeType.productDesigner,
    EmployeeType.productOwner,
    EmployeeType.qaTester,
    EmployeeType.seniorSoftwareDev
  ]

  constructor(private emplpoyeeService: EmployeeService, private router: Router,
    private activatedRoute: ActivatedRoute, private indexDbService: IndexDbService
  ){}

  
  ngOnInit(): void {
    if(!this.isToday(this.employeeData.startDate)) {
      this.startDateString = this.formatDate(this.employeeData.startDate);
    }
    if(this.employeeData.endDate != null) {
      this.endDateString = this.formatDate(this.employeeData.endDate);
    }
    this.activatedRoute.queryParams.subscribe((x) => {
      if(x !== null && !Number.isNaN(Number(x['id']))) {
        this.empId = Number(x['id']);
        this.indexDbService.getEmployee(this.empId).subscribe(x =>  {
          this.employeeData = x.employeeData;
          this.startDateString = this.formatDate(this.employeeData.startDate);
          this.endDateString = this.employeeData.endDate != null ? this.formatDate(this.employeeData.endDate) : this.endDateString;
        });
      }
    })    
  }

  openDialog(date: string): void {
    const dialogRef = this.dialog.open(CalendarComponent, {
      width: "400px",
      data: {
        date: date === 'startDate' ? this.employeeData.startDate : this.employeeData.endDate,
        type: date
      } as CalendarDialogData

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(result.type === 'startDate') {
          this.employeeData.startDate = result.date;
          this.startDateString = this.formatDate(result.date);
        } else {
          this.employeeData.endDate = result.date;
          this.endDateString = this.formatDate(result.date);
        }
      } else {
        console.log('Dialog closed without selecting a date.');
      }
    });
  }

 

  formatDate(date: Date): string {
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  isToday(date: Date): boolean {
    const today = new Date();
    
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  }
  SaveEmployee() {
    if(this.empId == -1) {
      this.indexDbService.addItem(this.employeeData).subscribe(() => {
        this.router.navigate(['/employee/list'])
      });
    } else {
      this.indexDbService.updateEmployee(this.empId, this.employeeData).subscribe(() => {
        this.router.navigate(['/employee/list'])
      });
    }


  }
  cancel() {
    this.router.navigate(['/employee/list'])
  }
}
