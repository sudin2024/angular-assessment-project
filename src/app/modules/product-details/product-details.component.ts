import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from "rxjs";
import {
  Product,
  selectOption,
  similarProductModel,
} from "../../shared/product.model";
import { ProductService } from "../../shared/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  searchTermSubject = new Subject<string>();
  similarMatchesItem: similarProductModel[] = [];
  productForm!: FormGroup;
  productOptions: selectOption[] = [];
  routeId!: number | string;
  productSubscription: Subscription = new Subscription();
  productData: Product[] = [];

  ngOnInit() {
    this.init();
  }

  init() {
    this.routeId = this.activatedRoute.snapshot.params["id"];
    this.productOptions = this.productService.listOfProduct;
    this.searchProduct();
    this.getIdByProduct();
  }

  getIdByProduct() {
    this.createForm();
    this.productSubscription = this.productService.updatedProductData.subscribe(
      (res) => {
        this.productData = res;
        if (res && this.routeId != "add") {
          let product = res.find((item) => item.id == this.routeId);
          if (product) {
            this.createForm(product);
          }
        }
      }
    );
  }

  createForm(product?: Product) {
    this.productForm = this.fb.group({
      productName: [
        product?.productName,
        [Validators.required, Validators.minLength(3)],
      ],
      productCategory: [product?.productCategory, Validators.required],
      similarProduct: [
        product?.similarProduct,
        [Validators.required, this.similarProductValidation],
      ],
    });
  }

  getProductFormByField(fieldName: string) {
    return this.productForm.get(fieldName);
  }

  onSubmit() {
    //console.log("form >>", this.productForm);
    let payloadData = {
      ...this.productForm.value,
      similarProduct: this.productForm.value.similarProduct.map((item: any) => {
        return {
          title: item.title,
        };
      }),
      id:
        this.routeId != "add"
          ? +this.routeId
          : Math.floor(Math.random() * 6 + 1),
    };

    if (!this.productForm.valid) {
      return;
    } else {
      this.productService.submitedProductData(payloadData);
      this.router.navigate(["product-list"]);
    }
  }

  onSearchProduct(event: any) {
    this.searchTermSubject.next(event.query);
  }

  searchProduct() {
    this.searchTermSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchTearm) =>
          this.productService
            .searchProduct(searchTearm)
            .pipe(takeUntil(this.searchTermSubject))
        )
      )
      .subscribe((res) => {
        this.similarMatchesItem = res;
      });
  }

  similarProductValidation(control: FormControl) {
    if (control.value && control.value.length < 2) {
      return {
        similarProductError: true,
      };
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    this.searchTermSubject.next("");
    this.searchTermSubject.complete();
    this.productSubscription.unsubscribe();
  }
}
