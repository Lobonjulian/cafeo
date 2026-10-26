import { baseOptions, extraOptions, sizeOptions } from "../data/builder";
import { cartStore } from "../store/CartStore";
import type { ExtraOption } from "../type/Builder";
import type { Product } from "../type/Product";
import { formatPrice } from "../utils/format";

const builderState = {
  step: 1 as 1 | 2 | 3 | 4,
  baseId: null as string | null,
  sizeId: null as string | null,
  extraIds: [] as string[],
};

function calculatePrice(): number {
  const base = baseOptions.find((b) => b.id === builderState.baseId);
  const size = sizeOptions.find((s) => s.id === builderState.sizeId);

  if (!base) return 0;

  const basePrice = base.price;
  const multiplier = size?.priceMultiplier ?? 1.0;

  const extrasTotal = builderState.extraIds.reduce((sum, extraId) => {
    const extra = extraOptions.find((e) => e.id === extraId);
    return sum + (extra?.price ?? 0);
  }, 0);

  return Math.round(basePrice * multiplier + extrasTotal);
}

export function buildProduct(): Product {
  const base = baseOptions.find((b) => b.id === builderState.baseId);
  const size = sizeOptions.find((s) => s.id === builderState.sizeId);

  const extras = builderState.extraIds
    .map((id) => extraOptions.find((e) => e.id === id))
    .filter((e): e is ExtraOption => e !== undefined);

  if (!base) {
    throw new Error("No se puede construir el producto sin una base");
  }

  const price = calculatePrice();

  const sizeName = size ? `${size.name}` : "";
  const extrasNames = extras.map((e) => e.name);
  const name =
    extrasNames.length > 0
      ? `${base.name}${sizeName} con ${extrasNames.join(" y ")}`
      : `${base.name}${sizeName}`;

  const id = [base.id, size?.id ?? "no-size", ...[...builderState.extraIds].sort()].join("-");
  const stars = Math.round(price / 1000);

  return {
    id,
    name,
    description: `Bebida personalizada: ${base.name}${sizeName}`,
    price,
    stars,
    image: base.image,
  };
}

function renderOptionButton(
  option: { id: string; name: string },
  isSelected: boolean,
  extraContent = "",
): string {
  return `
  <button
    type="button"
    class="builder__option ${isSelected ? "builder__option--selected" : ""}"
    data-option-id="${option.id}"
    aria-pressed="${isSelected}"
    >
      <span class="builder__option-name">${option.name}</span>
      ${extraContent}
    </button>
  `;
}

function attachOptionListeners(onSelect: (id: string) => void): void {
  document.querySelectorAll<HTMLElement>("[data-option-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      onSelect(btn.dataset.optionId!);
    });
  });
}

function attachNavigationListeners(): void {
  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.nav;
      if (action === "next" && builderState.step < 4) {
        builderState.step = (builderState.step + 1) as 1 | 2 | 3 | 4;
      } else if (action === "back" && builderState.step > 1) {
        builderState.step = (builderState.step - 1) as 1 | 2 | 3 | 4;
      }
      renderBuilder();
    });
  });
}

export function renderBuilder(): void {
  const stageContainer = document.querySelector(".personalize__builder-stage");
  const progressEl = document.querySelector(".builder__progress");

  if (!stageContainer || !progressEl) {
    console.error("No se encontraron contenedores del builder");
    return;
  }

  renderCurrentStep(stageContainer, progressEl);
}

function renderCurrentStep(stageContainer: Element, progressEl: Element): void {
  progressEl.textContent = builderState.step === 4 ? "Resumen" : `Paso ${builderState.step} de 3`;

  switch (builderState.step) {
    case 1:
      renderStep1(stageContainer);
      break;
    case 2:
      renderStep2(stageContainer);
      break;
    case 3:
      renderStep3(stageContainer);
      break;
    case 4:
      renderStep4(stageContainer);
      break;
  }
}

function renderStep1(container: Element): void {
  const optionsHtml = baseOptions
    .map((option) =>
      renderOptionButton(
        option,
        builderState.baseId === option.id,
        `
              <img src="${option.image}" alt="${option.name}" class="builder__option-image" />
              <span class="builder__option-price">${formatPrice(option.price)}</span>
              `,
      ),
    )
    .join("");

  const html = `
    <div class="builder__step">
      <h4>Elige tu base</h4>
      <div class="builder__options">${optionsHtml}</div>
      <div class="builder__navigation">
      ${
        builderState.baseId
          ? `<button type="button" class="btn--builder btn--next" data-nav="next">Siguiente</button>`
          : ""
      }
      </div>
    </div>
  `;

  container.innerHTML = html;

  attachOptionListeners((id) => {
    builderState.baseId = id;
    renderBuilder();
  });

  attachNavigationListeners();
}

function renderStep2(container: Element): void {
  const optionsHtml = sizeOptions
    .map((option) =>
      renderOptionButton(
        option,
        builderState.sizeId === option.id,
        `<span class="builder__option-multiplier">x${option.priceMultiplier}</span>`,
      ),
    )
    .join("");

  const html = `
    <div class="builder__step">
      <h4>Elige el tamaño</h4>
      <div class="builder__options">${optionsHtml}</div>
      <div class="builder__price-display" aria-live="polite">
        Precio actual: <strong>${formatPrice(calculatePrice())}</strong>
      </div>
      <div class="builder__navigation">
        <button type="button" class="btn--builder btn--back" data-nav="back">Atrás</button>
        ${
          builderState.sizeId
            ? `<button type="button" class="btn--builder btn--next" data-nav="next">Siguiente</button>`
            : ""
        }
      </div>
    </div>
  `;

  container.innerHTML = html;
  attachOptionListeners((id) => {
    builderState.sizeId = id;
    renderBuilder();
  });
  attachNavigationListeners();
}

function renderStep3(container: Element): void {
  const optionsHtml = extraOptions
    .map((option) =>
      renderOptionButton(
        option,
        builderState.extraIds.includes(option.id),
        `<span class="builder__option-price">${formatPrice(option.price)}</span>`,
      ),
    )
    .join("");

  const html = `
    <div class="builder__step">
       <h4>Agrega extras</h4>
     <p class="builder__hint">Puedes elegir varios (opcional)</p>
      <div class="builder__options">${optionsHtml}</div>
      <div class="builder__price-display" aria-live="polite">
        Precio actual: <strong>${formatPrice(calculatePrice())}</strong>
        </div>
      <div class="builder__navigation">
      <button type="button" class="btn--builder btn--back" data-nav="back">Atrás</button>
        <button type="button" class="btn--builder btn--next" data-nav="next">Finalizar</button> 
             </div>
    </div>
  `;

  container.innerHTML = html;

  attachExtraListeners();
  attachNavigationListeners();
}

function attachExtraListeners(): void {
  document.querySelectorAll<HTMLElement>("[data-option-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleExtra(btn.dataset.optionId!);
      renderBuilder();
    });
  });
}

function toggleExtra(id: string): void {
  builderState.extraIds = builderState.extraIds.includes(id)
    ? builderState.extraIds.filter((extraId) => extraId !== id)
    : [...builderState.extraIds, id];
}

function resetBuilder(): void {
  builderState.step = 1;
  builderState.baseId = null;
  builderState.sizeId = null;
  builderState.extraIds = [];
}

let feedbackTimeout: number | undefined;

function showFeedback(message: string): void {
  const feedback = document.getElementById("builder-feedback");
  if (!feedback) return;

  feedback.textContent = message;

  if (feedbackTimeout !== undefined) {
    clearTimeout(feedbackTimeout);
  }

  feedbackTimeout = window.setTimeout(() => {
    feedback.textContent = "";
  }, 2000);
}

function renderStep4(container: Element): void {
  const base = baseOptions.find((b) => b.id === builderState.baseId);
  const size = sizeOptions.find((s) => s.id === builderState.sizeId);
  const extras = builderState.extraIds
    .map((id) => extraOptions.find((e) => e.id === id))
    .filter((e): e is ExtraOption => e !== undefined);

  const extrasHtml =
    extras.length > 0
      ? extras.map((e) => `<span>${e.name} (+${formatPrice(e.price)})</span>`).join("<br/>")
      : `<span>Ninguno</span>`;

  const html = `
      <div class="builder__step">
      <h4>Resumen de tu bebida</h4>
      <div class="builder__summary">
        <div class="builder__summary-item">
          <span class="builder__summary-label">Base</span>
          <span>${base?.name ?? "-"} · ${base ? formatPrice(base.price) : ""}</span>
        </div>
        <div class="builder__summary-item">
          <span class="builder__summary-label">Tamaño</span>
          <span>${size?.name ?? "-"} ${size ? `(x${size.priceMultiplier})` : ""}</span>
        </div>
        <div class="builder__summary-item builder__summary-item--extras">
          <span class="builder__summary-label">Extras</span>
          ${extrasHtml}
        </div>
        <div class="builder__summary-total">
          <span>Total</span>
          <strong>${formatPrice(calculatePrice())}</strong>
        </div>
      </div>
      <div class="builder__navigation">
        <button type="button" class="btn--builder btn--back" data-nav="back">Atrás</button>
        <button type="button" class="btn--builder btn--next" id="summary-add-btn">
          Agregar al carrito
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;
  attachNavigationListeners();

  const addBtn = document.getElementById("summary-add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      cartStore.addItem(buildProduct());
      showFeedback("¡Bebida agregada al carrito!")
      resetBuilder();
      renderBuilder();
    });
  }
}
