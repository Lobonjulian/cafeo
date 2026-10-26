import { cartStore } from "../store/CartStore";
import type { CartItem } from "../type/Cart";
import { formatPrice } from "../utils/format";

function renderItem(item: CartItem): string {
  const subtotal = item.product.price * item.quantity;

  return `
    <li class="cart-item" data-product-id="${item.product.id}">
      <img 
        src="${item.product.image}" 
        alt="${item.product.name}" 
        class="cart-item__image"
      />
      <div class="cart-item__info">
        <h3 class="cart-item__name">${item.product.name}</h3>
        <p class="cart-item__price">$${item.product.price.toFixed(2)}</p>
      </div>
      <div class="cart-item__controls">
        <button 
          type="button" 
          class="cart-item__btn" 
          data-action="decrease"
          aria-label="Disminuir cantidad de ${item.product.name}"
        >−</button>
        <span class="cart-item__qty" aria-label="Cantidad: ${item.quantity}">${item.quantity}</span>
        <button 
          type="button" 
          class="cart-item__btn" 
          data-action="increase"
          aria-label="Aumentar cantidad de ${item.product.name}"
        >+</button>
        <button 
          type="button" 
          class="cart-item__btn cart-item__btn--remove" 
          data-action="remove"
          aria-label="Eliminar ${item.product.name}"
        >🗑</button>
      </div>
      <div class="cart-item__subtotal">
        ${formatPrice(subtotal)}
      </div>
    </li>
  `;
}

export function renderCartItems(): void {
  const container = document.getElementById("cart-items");
  const emptyMsg = document.querySelector(".cart-drawer__empty");
  const totalEl = document.getElementById("cart-total");

  if (!container || !emptyMsg || !totalEl) {
    console.error("Faltan elementos del drawer");
    return;
  }

  const { items, total } = cartStore.getState();

  if (items.length === 0) {
    container.innerHTML = "";
    emptyMsg.removeAttribute("hidden");
  } else {
    emptyMsg.setAttribute("hidden", "");
    container.innerHTML = items.map(renderItem).join("");
    attachItemListeners();
  }

  totalEl.textContent = `$${total.toFixed(2)}`;
}

function attachItemListeners(): void {
  const items = document.querySelectorAll<HTMLElement>(".cart-item");

  items.forEach((item) => {
    const productId = item.dataset.productId!;

    item.querySelectorAll<HTMLElement>("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const current = cartStore.getState().items.find((i) => i.product.id === productId);

        if (!current) return;

        if (action === "increase") {
          cartStore.updateQuantity(productId, current.quantity + 1);
        } else if (action === "decrease") {
          cartStore.updateQuantity(productId, current.quantity - 1);
        } else if (action === "remove") {
          cartStore.removeItem(productId);
        }
      });
    });
  });
}
