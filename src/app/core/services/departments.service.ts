import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { BehaviorSubject, Observable, catchError, map, shareReplay, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient,
    private authSvc : AuthenticationService,

    ) {
      this.departmentsGetRequest();
    }

    private subject = new BehaviorSubject<string[]>([]);

    $departments : Observable<string[]> = this.subject.asObservable();

  //Get Departments Data
  // public departmentsGetRequest() {
  //   this.http.get<HttpResponse<string[]>>(environment.optaviseUrl + '/departments',{ headers: this.authSvc.getRequestHeaders(), observe: 'response', reportProgress: true }).pipe(
  //     map(res => {
  //       console.log(res);
  //     return res;
  //     }),
  //     shareReplay(),
  //     catchError((err): any => {
  //       throwError(()=>{
  //         console.error(err);
  //       return err
  //       })
  //     })
  //   )
  //   }

  private departmentsGetRequest(): Observable<string[]> {
      // Make the GET request
     const loadEmployees$ = this.http.get<string[]>(environment.optaviseUrlV2 + '/departments',{ headers: this.authSvc.getRequestHeaders(), observe: 'response', reportProgress: true })
     .pipe(
      catchError(err => {
        const message = 'Failed to load Employees';
        console.log(message, err);
        return throwError(() => new Error(err));
      }),
      map(res => {
      console.log(res, 'res');
      return res.body === null ? [] : res.body ;
      }),
      tap(department =>
        this.subject.next(
          department
        )
        )
    );
  }



}
