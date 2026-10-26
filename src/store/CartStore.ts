import type { CartItem, CartState } from "../type/Cart";
import type { Product } from "../type/Product";

export class CartStore {
  private static readonly STORAGE_KEY = "cafeo_cart";

  private state: CartState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadInitialState();
  }

  getState(): CartState {
    return this.state;
  }

  subscribe(listener: () => void): void {
    this.listeners.add(listener);
  }

  unsubscribe(listener: () => void): void {
    this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  private computeTotals(items: CartItem[]): { total: number; totalItems: number } {
    return {
      total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  private loadInitialState(): CartState {
    const empty: CartState = { items: [], total: 0, totalItems: 0 };

    try {
      const raw = localStorage.getItem(CartStore.STORAGE_KEY);
      if (!raw) return empty;

      const parsed = JSON.parse(raw) as { items?: CartItem[] };

      if (!parsed || !Array.isArray(parsed.items)) return empty;

      return { items: parsed.items, ...this.computeTotals(parsed.items) };
    } catch (error) {
      console.warn("No se pudo cargar el carrito de localStorage:", error);
      return empty;
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(CartStore.STORAGE_KEY, JSON.stringify(this.state));
    } catch (error) {
      console.warn("No se pudo guardar el carrito en localStorage:", error);
    }
  }

  private commit(items: CartItem[]): void {
    this.state = { items, ...this.computeTotals(items) };
    this.persist();
    this.notify();
  }

  addItem(product: Product): void {
    if (!product?.id) {
      console.warn("Producto inválido:", product);
      return;
    }
    const existingItem = this.state.items.find((item) => item.product.id === product.id);

    const newItems = existingItem
      ? this.state.items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...this.state.items, { product, quantity: 1 }];

    this.commit(newItems);
  }

  removeItem(productId: string): void {
    const newItems = this.state.items.filter((item) => item.product.id !== productId);

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

  clear(): void {
    this.commit([]);
  }
}

export const cartStore = new CartStore();
