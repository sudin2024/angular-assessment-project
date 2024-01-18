import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductDetailsRoutingModule } from "./product-details-routing.module";
import { ProductDetailsComponent } from "./product-details.component";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProductDetailsModule {}
