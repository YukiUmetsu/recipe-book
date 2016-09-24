import { Injectable } from '@angular/core';
import {Ingredient} from "../shared/ingredient";

@Injectable()
export class ShoppingListService {
  private items: Ingredient[] = [];

  constructor() { }

  getItems(){
    return this.items;
  }

  addItems(items: Ingredient[]){
    // add all items given to this.items array
    Array.prototype.push.apply(this.items, items);
  }
}
