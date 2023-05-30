import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from 'src/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardsListComponent } from './shared/components/cards-list/cards-list.component';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { EmployeesStore } from './core/store/employees.store';
import { DepartmentsStore } from './core/store/departments.store';

@NgModule({
  declarations: [
    HomeComponent,
    CardsListComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    DepartmentsStore,
    EmployeesStore
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
