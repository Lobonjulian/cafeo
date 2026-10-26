import { cartStore } from "../store/CartStore";
import { renderCartItems } from "./CartItems";

function updateBadge(badge: HTMLElement, openBtn: HTMLElement): void {
  const totalItems = cartStore.getState().totalItems;
  badge.textContent = String(totalItems);

  if (totalItems > 0) {
    openBtn.removeAttribute("hidden");
  } else {
    openBtn.setAttribute("hidden", "");
  }
}

export function initCartDrawer(): void {
  const drawer = document.getElementById("cart-drawer") as HTMLDialogElement | null;
  const openBtn = document.getElementById("cart-open-btn");
  const closeBtn = document.getElementById("cart-drawer-close");
  const badge = document.getElementById("cart-badge");

  if (!drawer || !openBtn || !closeBtn || !badge) {
    console.error("Falta elementos del drawer");
    return;
  }

  openBtn.addEventListener("click", () => {
    if (!drawer.open) {
      drawer.showModal();
    }
  });

  closeBtn.addEventListener("click", () => {
    drawer.close();
  });

  drawer.addEventListener("click", (event) => {
    if (event.target === drawer) {
      drawer.close();
    }
  });

  cartStore.subscribe(() => updateBadge(badge, openBtn));
  cartStore.subscribe(renderCartItems);
  renderCartItems();
  updateBadge(badge, openBtn);
}
