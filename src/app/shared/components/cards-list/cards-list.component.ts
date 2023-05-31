import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IEmployee } from '../../models/IEmployee.model';
import "ngx-pagination";
import {Collection} from "ngx-pagination";

@Component({
  selector: 'optavise-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent  {

  @Input()
  employeesList$: any;

  page: number = 1;
  count: number = 0;


  @Input()
  id!: string;
  @Input()
  maxSize!: number;
  @Output()
  pageChange!: EventEmitter<number>;
  @Output()
  pageBoundsCorrection!: EventEmitter<number>;
  constructor() { }

  hasVipStatus(employee : IEmployee) : boolean {
    return new Date(employee.dateOfHire) < new Date('2020-01-01');
  }

  buildPngSrc(employee : IEmployee) : string {
    return environment.optavisePngUrl + employee.avatar;
  }

  onPageEvent(event: any) {
    this.page = event;
    console.log(event);
  }




}
