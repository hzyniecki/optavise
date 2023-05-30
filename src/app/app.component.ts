import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IEmployee } from './shared/models/IEmployee.model';
import { EmployeesStore } from './core/store/employees.store';
import { DepartmentsStore } from './core/store/departments.store';

@Component({
  selector: 'optavise-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class HomeComponent implements OnInit {

  availableEmployees$!: Observable<IEmployee[]>;

  departmentDropDownOptions$!: Observable<string[]>;

  departmentDropdownDefault: string = 'All Departments';

  constructor(public departmentsService: DepartmentsStore, private employeesStore: EmployeesStore
  ) { }

  ngOnInit() {
    this.departmentDropDownOptions$ = this.departmentsService.$departments.pipe(
      map(depts => {
        depts.unshift(this.departmentDropdownDefault);
        return depts;
      })
    );
    this.setEmployeeList(this.employeesStore.employees$);
  }

  //
  selectDepartment(option: string) {
    if (option === this.departmentDropdownDefault) {
      this.setEmployeeList(this.employeesStore.employees$);
      return;
    }

    this.setEmployeeList(this.employeesStore.filterByDepartment(option));
  }

  private setEmployeeList(newEmployeeList: Observable<IEmployee[]>) {
    this.availableEmployees$ = newEmployeeList.pipe(map(employees => employees.sort(this.sortByDescDate)));
  }

  private sortByDescDate(objA: IEmployee, objB: IEmployee) {
    return new Date(objB.dateOfHire).getTime() - new Date(objA.dateOfHire).getTime();
  }
}
