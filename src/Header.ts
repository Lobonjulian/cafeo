import CloseOutlinedIcon from "~icons/ant-design/close-outlined";
import MenuHamburgerIcon from "~icons/charm/menu-hamburger";

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

function setMenuState(open: boolean): void {
  if (!menuToggle || !mainNav) return;

  mainNav.classList.toggle("is-open", open);

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Cerrar menú de navegación" : "Abrir menu de navegación",
  );

  menuToggle.innerHTML = open
    ? (menuToggle.dataset.iconOpen ?? "")
    : (menuToggle.dataset.iconClosed ?? "");
}

function isOpen(): boolean {
  return mainNav?.classList.contains("is-open") ?? false;
}

function initMenuToggle(): void {
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", () => {
    setMenuState(!isOpen());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!isOpen()) return;

    const path = event.composedPath(); 

    if (!path.includes(mainNav) && !path.includes(menuToggle)) {
      setMenuState(false);
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 769px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) setMenuState(false);
  });
}

export function renderHeader(): void {
  if (!menuToggle) {
    console.error("no se encontró el botón de menu");
    return;
  }

  menuToggle.innerHTML = MenuHamburgerIcon;
  menuToggle.dataset.iconOpen = CloseOutlinedIcon;
  menuToggle.dataset.iconClosed = MenuHamburgerIcon;

  initMenuToggle();
}
