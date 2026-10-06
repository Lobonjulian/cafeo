import { extras } from "../data/extras";

export function renderExtras(): void {
  const extraContainer = document.getElementById("extras-grid");

  if (!extraContainer) {
    console.error("No se encontró el contenedor extras");
    return;
  }

  const extraHTML = extras
    .map(
      (item) => `
  <article class="extra-card">
  <img src="${item.imageUrl}" alt="${item.title}" class="extra-card__image"/>
  <h3 >${item.title}</h3>
  <p>${item.description}</p>
  </article>
  `,
    )
    .join("");
  extraContainer.innerHTML = extraHTML;
}
