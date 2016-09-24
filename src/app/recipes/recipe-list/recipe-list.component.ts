import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  @Output() recipeSelected = new EventEmitter<Recipe>();
  //recipe = new Recipe('dummy', 'Dummy description', 'http://lehmanlaw.mn/wp-content/uploads/2016/03/vga-1.png');

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onSelected(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }

}
