import { Component, Input } from '@angular/core';
import { IEmployee } from '../../models/employeesRaw.model';

@Component({
  selector: 'optavise-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent  {

  @Input()
  employeesList: IEmployee[] | null = [];

  constructor() { }

  // validateVipStatus(employeeData){

  // }




}
