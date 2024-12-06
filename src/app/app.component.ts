import { Component } from '@angular/core';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'Webapp de Productos con Angular 18';
  public header_color: string;

  constructor() {
    this.header_color = GLOBAL.header_color;
  }
}
