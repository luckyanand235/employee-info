import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarDialogData } from 'src/app/models/employee.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  selectedDate = new FormControl(new Date());
  startMonth!: Date;
  showCalendar: boolean = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: CalendarDialogData, private dialogRef: MatDialogRef<CalendarComponent>) {
    this.selectedDate.setValue(this.data.date);
    if (data && data.date) {
      this.startMonth = new Date(data.date);
    }
  }

  ngOnInit(): void {
  }

  buttonClicked: string = 'today';
  today() {
    this.buttonClicked = 'today';
    this.selectedDate.setValue(new Date());
    this.startMonth = new Date();
    this.toggleCalendar();
  }

  nextMonday() {
    this.buttonClicked = 'nextMonday';
    const date = new Date();
    date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7);
    this.selectedDate.setValue(date);
    this.startMonth = date;
    this.toggleCalendar();
  }

  nextTuesday() {
    this.buttonClicked = 'nextTuesday';
    const date = new Date();
    date.setDate(date.getDate() + (2 + 7 - date.getDay()) % 7);
    this.selectedDate.setValue(date);
    this.startMonth = date;
    this.toggleCalendar()
  }

  afterOneWeek() {
    this.buttonClicked = 'afterOneWeek'
    const date = new Date();
    date.setDate(date.getDate() + 7);
    this.selectedDate.setValue(date);
    this.startMonth = date;
    this.toggleCalendar()
  }

  save() {
    const data = {
      date: this.selectedDate.value,
      type: this.data.type
    } as CalendarDialogData;
    this.dialogRef.close(data);
  }

  setDate(date: Date) {
    this.selectedDate.setValue(date);
  }

  getButtonClass(action: string): {[key: string]: boolean} {
    return {
      'secondary-btn': this.buttonClicked !== action,
      'primary-btn': this.buttonClicked === action
    };
  }

  private toggleCalendar() {
    this.showCalendar = false;
    setTimeout(() => this.showCalendar = true, 0);
  }
}
