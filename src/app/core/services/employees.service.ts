import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { IEmployee } from 'src/app/shared/models/employeesRaw.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

constructor(private http: HttpClient,
  private authSvc : AuthenticationService) {}

// Get Employee data
 employeeGetRequest(): Observable<HttpResponse<IEmployee[]>> {
  // Make the GET request
 return this.http.get<IEmployee[]>(environment.optaviseUrlV2 + '/employees',{ headers: this.authSvc.getRequestHeaders(), observe: 'response', reportProgress: true })
 .pipe(
  shareReplay()
  );
}


}


