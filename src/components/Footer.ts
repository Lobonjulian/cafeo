import { footerColumns, socialLinks } from "../data/footer.js";

export function renderFooter(): void {
  const linksContainer = document.querySelector(".footer .links");
  const socialContainer = document.querySelector(".footer .social");

  if (!linksContainer || !socialContainer) {
    console.error("No se encontraron los contenedores del footer");
    return;
  }

  const columnsHTML = footerColumns
    .map(
      (column) => `
    <div class="footer__column">
      <h4 class="footer__column-title">${column.title}</h4>
      <ul class="footer__links">
        ${column.links.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}
      </ul>
    </div>
  `,
    )
    .join("");

  linksContainer.innerHTML = columnsHTML;

  const socialHTML = socialLinks
    .map(
      (social) => `
    <a href="${social.href}" aria-label="${social.platform}" target="_blank" rel="noopener noreferrer">
      <span class="icon-${social.icon}"></span>
      </a>
  `,
    )
    .join("");

  socialContainer.innerHTML = `<p>© 2026 Cafeo. Todos los derechos reservados</p>
${socialHTML}`;
}
