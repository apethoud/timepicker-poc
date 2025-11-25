import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputOne } from './components/input-one/input-one';
import { InputTwo } from './components/input-two/input-two';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputOne,
    InputTwo,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
