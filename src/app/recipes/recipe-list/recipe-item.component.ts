import { Component, Input } from '@angular/core';
import {Recipe} from "../recipe";

@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: [`
    .pull-right {
        float: right!important;
        max-width: 18rem;
        margin: 1em;
    }
`]
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() recipeId: number;
}
