import { Component, OnInit } from '@angular/core';
import {DropdownDirective} from "./dropdown.directive";
import {RecipeService} from "./recipes/recipe.service";

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) { }

  onSearch(word:string){
    this.recipeService.searchRecipe(word);
  }

  onStore(){
    this.recipeService.storeData().subscribe(
        (data)=>console.log(data),
        (error)=>console.log(error)
    );
  }

  onFetch(){
    this.recipeService.fetchData();
  }
}
