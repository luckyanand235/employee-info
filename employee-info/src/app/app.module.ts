import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';
import { HeaderComponent } from './components/header/header.component';
import { NoEmployeeComponent } from './components/no-employee/no-employee.component';
import { EmployeeDataComponent } from './components/employee-data/employee-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { Employee } from './models/employee.model';

const dbConfig: DBConfig = {
  name: 'myDatabase',
  version: 1,
  objectStoresMeta: [{
    store: 'employees',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name : 'employeeName', keypath: 'employeeName', options: { unique: false } },
      { name : 'employeeType', keypath: 'employeeType', options: { unique: false } },
      { name : 'startDate', keypath: 'startDate', options: { unique: false } },
      { name : 'endDate', keypath: 'endDate', options: { unique: false } }
    ]
  }]
};


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    HeaderComponent,
    NoEmployeeComponent,
    EmployeeDataComponent,
    CalendarComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HammerModule,
    NgxIndexedDBModule.forRoot(dbConfig)  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
