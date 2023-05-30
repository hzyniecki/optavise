import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { IEmployee } from "src/app/shared/models/IEmployee.model";
import { AuthenticationService } from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeesStore {

  // Encapsulates data so it can't be manipulated elswhere
  // State Management
  private subject = new BehaviorSubject<IEmployee[]>([]);

  employees$: Observable<IEmployee[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private authSvc: AuthenticationService) {
    this.loadEmployeeData();
  }

  private loadEmployeeData() {
    this.http.get<IEmployee[]>(environment.optaviseUrlV2 + '/employees', {
      headers: this.authSvc.getRequestHeaders(),
      observe: 'response',
      reportProgress: true
    }).pipe(
      catchError(err => {
        const message = 'Failed to load Employees';
        console.log(message, err);
        return throwError(() => new Error(err));
      }),
      map(res => {
          console.log(res, 'res');
          return res.body === null ? [] : res.body;
        }
      ),
      tap(employees => this.subject.next(employees))
    ).subscribe();
  }

  filterByDepartment(department: string): Observable<IEmployee[]> {
    return this.employees$.pipe(
      map(employees =>
        employees.filter(
          employee => employee.department === department)
      )
    );
  }
}
