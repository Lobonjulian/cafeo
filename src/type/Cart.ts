import { Product } from "./Product";

export interface CartItem {
  readonly product: Product;
  readonly quantity: number;
}

export interface CartState {
  readonly items: readonly CartItem[];
  readonly total: number;
  readonly totalItems: number;
}
