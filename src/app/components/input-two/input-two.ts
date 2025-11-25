import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { distinctUntilChanged } from 'rxjs';

const COLON_INDEX = 2;
const LAST_EDITABLE_INDEX = 4;

// Handle the backspace key press appropriately, undoing the previous change (if any) and moving the highlight to the previous character (skipping the colon)
// Constrain the allowed characters for each index, such that the time is always valid:
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
    if (!this.inputControl.value) {
      console.log('Error: No input value');
      return;
    }

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

    const notAValidNumber =
      !this._isNumberKey(event.code) ||
      this._doesNumberInsertionResultInAnUnreconcilableInvalidTime(event.key, this.selectedIndex);

    if (notAValidNumber) {
      event.preventDefault();
    }

    const firstDigitWillBeOne = event.key === '1' && this.selectedIndex === 0;
    this._changeSecondDigitToValidValueIfFirstDigitWillBeOne(firstDigitWillBeOne, inputElement);
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

  private _doesNumberInsertionResultInAnUnreconcilableInvalidTime(
    numString: string,
    insertionIndex: number
  ): boolean {
    const num = parseInt(numString);
    if (insertionIndex === 0 && num > 1) {
      return true;
    }

    if (insertionIndex === 3 && num > 5) {
      return true;
    }

    return false;
  }

  private _changeSecondDigitToValidValueIfFirstDigitWillBeOne(
    firstdigitWillBeOne: boolean,
    el: HTMLInputElement
  ) {
    if (!firstdigitWillBeOne) {
      return;
    }

    if (!this.inputControl.value) {
      console.log('Error: No input value');
      return;
    }

    if (parseInt(this.inputControl.value[1]) < 3) {
      return;
    }

    const updatedValueArray = this.inputControl.value.split('');
    updatedValueArray.splice(1, 1, '2');
    const updatedValue = updatedValueArray.join('');
    this.inputControl.setValue(updatedValue);
    el.setSelectionRange(0, 1);
  }
}
