import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Recipe} from "../recipe";

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('curry', 'indian curry', 'http://ichef.bbci.co.uk/food/ic/food_16x9_608/recipes/chickenjalfrezi_91772_16x9.jpg', []),
    new Recipe('tomato pasta', 'tomato Pasta dish', 'http://www.wikihow.com/images/3/38/Make-a-Delicious-Dish-of-Spaghetti-and-Tomato-Sauce-Step-18.jpg', []),
    new Recipe('pizza', 'pizza description', 'http://netgeek.biz/wp-content/uploads/2015/12/pizza_newyork5.jpg', [])
  ];
  @Output() recipeSelected = new EventEmitter<Recipe>();
  //recipe = new Recipe('dummy', 'Dummy description', 'http://lehmanlaw.mn/wp-content/uploads/2016/03/vga-1.png');

  constructor() { }

  ngOnInit() {
  }

  onSelected(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }

}
