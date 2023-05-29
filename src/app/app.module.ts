import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from 'src/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { CardsListComponent } from './shared/components/cards-list/cards-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardsListComponent,
    LoadingComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    EmployeesService,
    DepartmentsService,
    LoadingService
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
