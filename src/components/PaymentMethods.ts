import { paymentMethods } from "../data/paymentMethod";

export function renderPaymentMethods(): void {
  const paymentContainer = document.getElementById("payment-list");

  if (!paymentContainer) {
    console.error("No se encontró  el contenedor Payment");
    return
  }

  const paymentHTML = paymentMethods
    .map((item) => `
    <article class="payment-card">
    <div class="payment-card__content">
      <span>${item.stars}</span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
        <img src="${item.image}" alt="${item.title} " class="payment-card__image"/>
      </div>
    </article>
  `,
    )
    .join("");

  paymentContainer.innerHTML = paymentHTML;
}
