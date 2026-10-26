import { renderBuilder } from "./components/Builder";
import { initCartDrawer } from "./components/CartDrawer";
import { renderExtras } from "./components/Extras";
import { renderFooter } from "./components/Footer";
import { renderPaymentMethods } from "./components/PaymentMethods";
import { renderRewardsBar } from "./components/RewardsBar";
import { steps } from "./data/steps";
import { renderHeader } from "./Header";

function renderSteps(): void {
  const stepsContainer = document.getElementById("steps-grid");

  if (!stepsContainer) {
    console.error("No se encontró el contenedor de los pasos");
    return;
  }

  const htmlContent = steps
    .map((item) => {
      return `
    <article class="step-card">
      <span class="step-number">${item.number}</span>
      <h3 class="step-name">${item.title}</h3>
      <p class="step-description">${item.description}</p>
    </article>
    `;
    })
    .join("");

  stepsContainer.innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderSteps();
  renderRewardsBar();
  renderExtras();
  renderPaymentMethods();
  renderFooter();
  initCartDrawer();
  renderBuilder();
});
