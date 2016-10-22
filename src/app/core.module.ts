import {NgModule} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {HomeComponent} from "./home.component";
import {routing} from "./app.routing";

@NgModule({
    declarations:[DropdownDirective, HomeComponent],
    exports:[DropdownDirective],
    imports: [routing]
})
export class CoreModule { }