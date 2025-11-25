import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { distinctUntilChanged } from 'rxjs';

const TIME_STRING_LENGTH = 5;

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly blankTime = '00:00';
  myControl = new FormControl(this.blankTime);

  ngOnInit() {
    const ctrl = this.myControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: string | null) => {
        this._handleValueChange(value);
      });
  }

  private _handleValueChange(value: string | null): void {
    if (value === null || value.length === TIME_STRING_LENGTH) {
      return;
    }

    const newValue =
      value.length > TIME_STRING_LENGTH
        ? this._handleAddedCharacter(value)
        : this._handleSubtractedCharacter(value);

    if (newValue !== value) {
      this.myControl.setValue(newValue, { emitEvent: false });
    }
  }

  private _handleAddedCharacter(value: string): string {
    const valArray = value.split('');
    valArray.splice(2, 1);
    valArray.shift();
    valArray.splice(2, 0, ':');
    return valArray.join('');
  }

  private _handleSubtractedCharacter(value: string): string {
    const valArray = value.split('');
    valArray.splice(2, 1);
    valArray.unshift('0');
    valArray.splice(2, 0, ':');
    return valArray.join('');
  }
}
