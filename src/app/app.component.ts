import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'NGRXFrontEnd';

  tiles: Tile[] = [
    //row one
    {text: 'One-1', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'One-2', cols: 4, rows: 1, color: 'lightgreen'},
    {text: 'One-3', cols: 1, rows: 1, color: 'lightpink'},
    //row two
    {text: 'Two-1', cols: 1, rows: 9, color: '#DDBDF1'},
    {text: 'Two-2', cols: 4, rows: 9, color: 'lightblue'},
    {text: 'Two-3', cols: 1, rows: 9, color: 'lightgreen'},
  ];  
}
