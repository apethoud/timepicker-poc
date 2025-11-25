import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { distinctUntilChanged } from 'rxjs';

const COLON_INDEX = 2;
const LAST_EDITABLE_INDEX = 4;

// On arrow key press (left or right only), the highlight should move to the appropriate adjacent character (skipping the colon)
// Handle the backspace key press appropriately, undoing the previous change (if any) and moving the highlight to the previous character (skipping the colon)
// Constrain the allowed characters for each index, such that the time is always valid:
//   For all of them: Only numeric characters
//   First: Either 0 or 1
//   Second: 0-2 always, 3-9 if First is 0
//   Third: 0-5
//   Fourth: 0-9

@Component({
  selector: 'app-input-two',
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input-two.html',
  styleUrl: './input-two.css',
})
export class InputTwo implements OnInit {
  readonly blankTime = '00:00';
  inputControl = new FormControl(this.blankTime);
  selectedIndex: number = 0;

  ngOnInit() {}

  handleInputFocus(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this._selectFirstIndex(inputElement);
  }

  handleInputInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this._selectNextIndex(inputElement);
  }

  handleKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;

    if (event.key === 'ArrowUp') {
      this._selectFirstIndex(inputElement);
    }
    if (event.key === 'ArrowDown') {
      this._selectLastIndex(inputElement);
    }
    if (event.key === 'ArrowRight') {
      this._selectNextIndex(inputElement);
    }
    if (event.key === 'ArrowLeft') {
      this._selectPreviousIndex(inputElement);
    }

    if (!this._isNumberKey(event.code)) {
      event.preventDefault();
    }
  }

  private _selectFirstIndex(el: HTMLInputElement): void {
    this.selectedIndex = 0;
    el.setSelectionRange(this.selectedIndex, this.selectedIndex + 1);
  }

  private _selectLastIndex(el: HTMLInputElement): void {
    this.selectedIndex = LAST_EDITABLE_INDEX;
    el.setSelectionRange(this.selectedIndex, this.selectedIndex + 1);
  }

  private _selectNextIndex(el: HTMLInputElement): void {
    if (this.selectedIndex === COLON_INDEX - 1) {
      this.selectedIndex = this.selectedIndex + 2;
      el.setSelectionRange(this.selectedIndex, this.selectedIndex + 1);
      return;
    }

    if (this.selectedIndex < LAST_EDITABLE_INDEX) {
      this.selectedIndex++;
      el.setSelectionRange(this.selectedIndex, this.selectedIndex + 1);
      return;
    }

    if ((this.selectedIndex = LAST_EDITABLE_INDEX)) {
      this.selectedIndex = 0;
      el.setSelectionRange(this.selectedIndex, this.selectedIndex + 1);
      return;
    }
  }

  private _selectPreviousIndex(el: HTMLInputElement): void {
    if (this.selectedIndex === COLON_INDEX + 1) {
      this.selectedIndex = this.selectedIndex - 2;
      el.setSelectionRange(this.selectedIndex, this.selectedIndex + 1);
      return;
    }

    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      el.setSelectionRange(this.selectedIndex, this.selectedIndex + 1);
      return;
    }

    if (this.selectedIndex === 0) {
      this.selectedIndex = LAST_EDITABLE_INDEX;
      el.setSelectionRange(this.selectedIndex, this.selectedIndex + 1);
      return;
    }
  }

  private _isNumberKey(keyCode: string) {
    return keyCode.includes('Digit');
  }
}
