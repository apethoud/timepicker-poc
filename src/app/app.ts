import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { timeOptions } from './times';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';

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
  myControl = new FormControl('');
  options: string[] = timeOptions;
  filteredOptions?: string[];

  ngOnInit() {
    const ctrl = this.myControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: string | null) => {
        this._handleValueChange(value);
      });
  }

  private _handleValueChange(value: string | null) {
    console.log('value: ', value);

    if (value === null) {
      return;
    }

    this.filteredOptions = this._filter(value);

    // const formatted = this.formatEnteredValue(value) // add the colon
    // if (formatted !== value) {
    //   ctrl.setValue(formatted, { emitEvent: false }); // show it in the view without calling this function again
    // }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
