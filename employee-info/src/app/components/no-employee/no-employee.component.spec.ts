import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEmployeeComponent } from './no-employee.component';

describe('NoEmployeeComponent', () => {
  let component: NoEmployeeComponent;
  let fixture: ComponentFixture<NoEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoEmployeeComponent]
    });
    fixture = TestBed.createComponent(NoEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
