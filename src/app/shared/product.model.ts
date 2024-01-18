export interface Product {
  id: number;
  productName: string;
  productCategory: selectOption;
  similarProduct: similarProductModel[];
}

export interface selectOption {
  id: number;
  name: string;
}

export interface similarProductModel {
  body?: string;
  id?: number;
  title: string;
  userId?: number;
}
