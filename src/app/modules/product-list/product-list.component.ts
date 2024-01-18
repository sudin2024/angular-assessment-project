import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../../shared/product.service";
import { Product } from "../../shared/product.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private productService: ProductService) {}

  productSubscription: Subscription = new Subscription();
  products: Product[] = [];

  ngOnInit(): void {
    this.productSubscription = this.productService.updatedProductData.subscribe(
      (res) => {
        if (res) this.products = res;
      }
    );
  }

  goToDetais(identifire: string, id?: any) {
    if (id) {
      this.router.navigate(["product-details", id]);
    } else {
      this.router.navigate(["product-details", identifire]);
    }
  }

  deleteProduct(id: number) {
    const objWithIdIndex = this.products.findIndex((obj) => obj.id === id);
    if (objWithIdIndex > -1) {
      this.products.splice(objWithIdIndex, 1);
    }
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
