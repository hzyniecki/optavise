import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './core/services/employees.service';
import { DepartmentsService } from './core/services/departments.service';
import { Observable, catchError, shareReplay, throwError  } from 'rxjs';

import { EmployeesStore } from './shared/employees.store';
import { IEmployee } from './shared/models/employeesRaw.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'optavise-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class HomeComponent implements OnInit  {

  allEmployees$!: Observable<IEmployee[]>;

  executiveDepartment$!: Observable<IEmployee[]>;

  supportDepartment$!: Observable<IEmployee[]>;

  departments$!: Observable<string[]>;


  //#Fix Dropdown options needs to be populated with the departments list call
  dropdownOptions: any = this.departments$;

  departmentDropdownDefault: string = 'All Departments';

  constructor(public employeesService: EmployeesService,
    public departmentsService: DepartmentsService,
    private employeesStore: EmployeesStore
    ) {
      this.loadEmployees();
      this.filterEmployees();
    }

  ngOnInit() {

   this.departments$ = this.departmentsService.departmentsGetRequest();
  }

  loadEmployees() {
    this.employeesService.employeeGetRequest().pipe(
      catchError(err => {
        const message = 'Failed to load Employees';
        console.log(message, err);
        return throwError(() => new Error(err));
      }),
    )
  }

  //#Fix Need to send through parameters on click through the drop down
  filterEmployees() {
    this.executiveDepartment$ = this.employeesStore.filterByDepartment('Executive');
    this.supportDepartment$ = this.employeesStore.filterByDepartment('Support');
  }


  selectDepartment(option: string) {
    console.log('Selected option:', option);
    // Handle the selected option here
  }




}
