import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Product, selectOption, similarProductModel } from "./product.model";

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  productData: Product[] = [
    {
      productName: "Product name 1",
      productCategory: { id: 1, name: "Product 1" },
      similarProduct: [{ title: "similar A 1" }, { title: "similar A 2" }],
      id: 10001,
    },
    {
      productName: "Product name 2",
      productCategory: { id: 2, name: "Product 2" },
      similarProduct: [{ title: "similar B 1" }, { title: "similar B 2" }],
      id: 200001,
    },
  ];

  productList$ = new BehaviorSubject<Product[]>(this.productData);
  get updatedProductData() {
    return this.productList$.asObservable();
  }

  listOfProduct: selectOption[] = [
    {
      id: 1,
      name: "Product 1",
    },
    {
      id: 2,
      name: "Product 2",
    },
    {
      id: 3,
      name: "Product 3",
    },
    {
      id: 4,
      name: "Product 4",
    },
  ];

  searchProduct(searchTearm: string): Observable<similarProductModel[]> {
    return this.httpClient.get<similarProductModel[]>(
      `https://jsonplaceholder.typicode.com/posts?searchTearm=${searchTearm}`
    );
  }

  submitedProductData(_data: Product) {
    const objWithIdIndex = this.productData.findIndex(
      (obj) => obj.id === _data.id
    );
    if (objWithIdIndex > -1) {
      this.productData.splice(objWithIdIndex, 1);
    }
    this.productData.unshift(_data);
    this.productList$.next(this.productData);
    //console.log("this.productListData >>", this.productData);
  }
}
