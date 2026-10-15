import type { CartItem, CartState } from "../type/Cart";
import type { Product } from "../type/Product";

export class CartStore {
  private state: CartState = {
    items: [],
    total: 0,
    totalItems: 0,
  };

  private listeners: Set<() => void> = new Set();

  getState(): CartState {
    return this.state;
  }

  subscribe(listeners: () => void): void {
    this.listeners.add(listeners);
  }

  unsubscribe(listeners: () => void): void {
    this.listeners.delete(listeners);
  }

  private notify(): void {
    this.listeners.forEach((listeners) => listeners());
  }

  private commit(items: CartItem[]): void {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    this.state = { items, total, totalItems };
    this.notify();
  }

  addItem(product: Product): void {
    const existingItem = this.state.items.find((item) => item.product.id === product.id);

    const newItems = existingItem
      ? this.state.items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...this.state.items, { product, quantity: 1 }];

    this.commit(newItems);
  }

  removeItem(productId: string): void {
    const newItems = this.state.items.filter((item) => item.product.id != productId);

    this.commit(newItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const newItems = this.state.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item,
    );

    this.commit(newItems);
  }
}

export const cartStore = new CartStore();
