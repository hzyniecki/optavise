import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsStore {

  constructor(private http: HttpClient, private authSvc: AuthenticationService) {
    this.loadDepartments();
  }

  private subject = new BehaviorSubject<string[]>([]);

  $departments: Observable<string[]> = this.subject.asObservable();


  private loadDepartments(): void {
    this.http.get<string[]>(environment.optaviseUrlV2 + '/departments', {
      headers: this.authSvc.getRequestHeaders(),
      observe: 'response',
      reportProgress: true
    })
      .pipe(
        catchError(err => {
          const message = 'Failed to load Employees';
          console.log(message, err);
          return throwError(() => new Error(err));
        }),
        map(res => {
          console.log(res, 'res');
          return res.body === null ? [] : res.body;
        }),
        tap(department => this.subject.next(department))
      ).subscribe();
  }
}
