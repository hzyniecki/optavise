import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'optavise-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input()
  options!: string[] | null;

  @Input()
  defaultOption!: string;

  @Output() optionSelected = new EventEmitter<string>();

  dropdownActive = false;
  selectedOption!: string;

  constructor() { }

  ngOnInit(): void {
      this.selectedOption = this.defaultOption || '';
  }

  toggleDropdown() {
    this.dropdownActive = !this.dropdownActive;
  }

  selectDropdownOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.dropdownActive = false;
  }


}
