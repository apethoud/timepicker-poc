import { Component } from '@angular/core';
import { InputOne } from './components/input-one/input-one';

@Component({
  selector: 'app-root',
  imports: [InputOne],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
