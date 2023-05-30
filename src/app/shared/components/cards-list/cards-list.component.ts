import { Component, Input } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IEmployee } from '../../models/IEmployee.model';

@Component({
  selector: 'optavise-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent  {

  @Input()
  employeesList$!: Observable<IEmployee[]>;

  constructor() { }

  hasVipStatus(employee : IEmployee) : boolean {
    return new Date(employee.dateOfHire) < new Date('2020-01-01');
  }

  buildPngSrc(employee : IEmployee) : string {
    return environment.optavisePngUrl + employee.avatar;
  }
}
