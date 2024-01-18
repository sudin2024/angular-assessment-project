import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { AutoCompleteModule } from "primeng/autocomplete";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
  ],
  exports: [
    ButtonModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
  ],
})
export class SharedModule {}
