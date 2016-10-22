import { Component } from '@angular/core';

@Component({
  selector: 'rb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  public recipeBoxSrc = '../assets/images/recipebox.jpg';
  public grocerylistSrc = '../assets/images/grocerylist.png';

  constructor() { }

}
