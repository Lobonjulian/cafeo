import { tier } from "../data/tier";

export function renderRewardsBar(): void {
  const rewardsContainer = document.getElementById("rewards-track");

  if (!rewardsContainer) {
    console.error("No se encontró el contenedor de la barra de recompensas");
    return;
  }

  const orderedTier = [...tier].sort((a, b) => a.stars - b.stars);

  const rewardsHTML = orderedTier
    .map((item) => {
      return `
    <div class="rewards-bar__tier">
      <div class="rewards-bar__content">
        <span class="rewards-bar__stars">${item.stars}⭐</span>
      </div>
    </div>
  `;
    })
    .join("");

  rewardsContainer.innerHTML = rewardsHTML;
}
