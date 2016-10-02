import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from "./recipe";
import {Ingredient} from "../shared/ingredient";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
    recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
      new Recipe('French Fries', 'sliced potatoes deep fries', 'https://afternoondrive.files.wordpress.com/2016/07/french-fries.jpg', [
          new Ingredient('potatoes', 5),
          new Ingredient('salt', 1),
          new Ingredient('oil', 2)
      ]),
    new Recipe('curry', 'indian curry', 'http://ichef.bbci.co.uk/food/ic/food_16x9_608/recipes/chickenjalfrezi_91772_16x9.jpg', [
        new Ingredient('curry powder', 2),
        new Ingredient('chicken', 1)
    ]),
    new Recipe('tomato pasta', 'tomato Pasta dish', 'http://www.wikihow.com/images/3/38/Make-a-Delicious-Dish-of-Spaghetti-and-Tomato-Sauce-Step-18.jpg', [
        new Ingredient('pasta', 2),
        new Ingredient('tomato can', 3)
    ]),
    new Recipe('pizza', 'pizza description', 'http://netgeek.biz/wp-content/uploads/2015/12/pizza_newyork5.jpg', [
        new Ingredient('flour', 50),
        new Ingredient('pizza source', 1)
    ]),
  ];
  constructor(private http: Http) { }

  getRecipes(){
    return this.recipes;
  }
  getRecipe(id: number){
      return this.recipes[id];
  }

  addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  storeData(){
    const body = JSON.stringify(this.recipes);
      const headers = new Headers({
         'Content-Type': 'application/json'
      });
      return this.http.put('https://recipe-book-274f8.firebaseio.com/recipes.json', body, { headers: headers});
  }

  fetchData(){
      return this.http.get('https://recipe-book-274f8.firebaseio.com/recipes.json')
          .map((response: Response)=> response.json())
          .subscribe(
              (data: Recipe[])=>{
                  this.recipes = data;
                  this.recipesChanged.emit(this.recipes);
              }
          );
  }
}
