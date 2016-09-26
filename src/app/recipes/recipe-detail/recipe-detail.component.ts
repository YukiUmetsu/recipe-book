import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Recipe} from "../recipe";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [``]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private selectedRecipe: Recipe;
  private recipeIndex: number;

  constructor(private sls:ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
        (params:any)=>{
          this.recipeIndex = params['id'];
          this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
        }
    );
  }

  onEdit(){}

  onDelete(){}

  onAddToShoppingList(){
    this.sls.addItems(this.selectedRecipe.ingredients);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
