import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";
import {Recipe} from "../recipe";
import {FormArray, FormGroup, FormControl, Validators, FormBuilder, Validator} from "@angular/forms";

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles:[`
    img{
        max-width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
 `]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew: boolean = true;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
        (params: any) => {
          if (params.hasOwnProperty('id')){
            this.isNew = false;
            this.recipeIndex = +params['id'];
            this.recipe = this.recipeService.getRecipe(this.recipeIndex);
          }else{
            this.isNew = true;
            this.recipe = null;
          }
          this.initForm();
        }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private navigateBack(){
    this.router.navigate(['../']);
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if (this.isNew){
      this.recipeService.addRecipe(newRecipe);
    }else{
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  onRemoveItem(index: number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }
  onAddItem(name: string, amount: string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
        new FormGroup({
          name: new FormControl(name, Validators.required),
          amount: new FormControl(amount, [
            Validators.required,
            Validators.pattern("\\d+")
              ])
        })
    )
  }

  private initForm(){
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    // Edit
    if(!this.isNew){
      for (let i = 0; i< this.recipe.ingredients.length; i++){
        recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [
                  Validators.required,
                  Validators.pattern("\\d+")
              ])
            })
        );
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imgPath;
      recipeContent = this.recipe.description;
    }
    //Create a form
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imgPath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }
}
