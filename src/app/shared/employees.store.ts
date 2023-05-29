import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { IEmployee, sortbyDescDate } from "./models/employeesRaw.model";
import { IEmployeeProcessed } from "./models/employeesProcessed.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../core/authentication/authentication.service";
import { LoadingService } from "../core/services/loading.service";


@Injectable({
  providedIn: 'root'
})

export class EmployeesStore {

  // Encapsulates data so it can't be manipulated elswhere
  // State Management
  private subject = new BehaviorSubject<IEmployee[]>([]);

  $employees : Observable<IEmployee[]> = this.subject.asObservable();


constructor(private http: HttpClient,
  private authSvc : AuthenticationService,
  private loading: LoadingService,){
  this.loadEmployeeData();
}

private loadEmployeeData() {
    const loadEmployees$ = this.http.get<IEmployee[]>(environment.optaviseUrlV2 + '/employees',{ headers: this.authSvc.getRequestHeaders(), observe: 'response', reportProgress: true }).pipe(
    catchError(err => {
      const message = 'Failed to load Employees';
      console.log(message, err);
      return throwError(() => new Error(err));
    }),
    // Migrate ternary to function potentially
    map(employeeResponse =>  {
      console.log(employeeResponse);
      this.subject.next(
        employeeResponse.body === null ? [] : employeeResponse.body
        );


        // migrate this function to Foreach and move it elsewhere (data isn't being updated)
        if (employeeResponse.body) {
         for (let i =0; i < employeeResponse.body.length; i++) {

          // console.log(environment.optavisePngUrl + employeeResponse.body[i].avatar );
          console.log(new Date(employeeResponse.body[i].dateOfHire));


          // Function to check whether or not an employee is a vip ( I want to insert this property into the interface if possible using a spread operator)
          const hireDate = new Date(employeeResponse.body[i].dateOfHire);
          const vipDate = new Date('2020-01-01');
          if (vipDate < hireDate) {
            let vipStatus = {...employeeResponse.body[i], vip: true}
            console.log(vipStatus);
          }
         }
        }


    }
      )
  );
  this.loading.showLoaderUntilCompleted(loadEmployees$)
  .subscribe();
}


  // getAllEmployees(): Observable<IEmployee[]> {
  //   return this.$employees.pipe(
  //     map(employees => employees)
  //   )
  // }


  filterByDepartment(department: string): Observable<IEmployee[]> {
    return this.$employees.pipe(
      map(employees => employees.filter(
        // Move sort to earlier portion of function
        employees => employees.department === department).sort(sortbyDescDate))
    )
  }



}
