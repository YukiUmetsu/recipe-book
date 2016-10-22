import { Component } from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'rb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  public recipeBoxSrc = environment.production ? __dirname + 'recipe-book/assets/images/recipebox.jpg' : __dirname + 'assets/images/recipebox.jpg';
  public grocerylistSrc = environment.production ? __dirname + 'recipe-book/assets/images/grocerylist.png' : __dirname + 'assets/images/grocerylist.png';

  constructor() { }

}
