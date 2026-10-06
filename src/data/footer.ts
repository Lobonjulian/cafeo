import type { FooterColumn, SocialLink } from "../type/Footer.js";

export const footerColumns: FooterColumn[] = [
  {
    title: "Sobre Nosotros",
    links: [
      { label: "Nuestra historia", href: "#" },
      { label: "Nuestro Cafe", href: "#" },
      { label: "Impacto social", href: "#" },
      { label: "Para inversores", href: "#" },
    ],
  },
  {
    title: "Servicio al Cliente",
    links: [
      { label: "Ayuda en Linea", href: "#" },
      { label: "Preguntas Frecuentes", href: "#" },
      { label: "Localizar Tienda", href: "#" },
      { label: "Contacto", href: "#" },
    ],
  },
  {
    title: "Responsabilidad",
    links: [
      { label: "Abastecimiento Etico", href: "#" },
      { label: "Medio Ambiente", href: "#" },
      { label: "Compromiso Comunitario", href: "#" },
      { label: "Imforme de Responsabilidad", href: "#" },
    ],
  },
  {
    title: "Empleo",
    links: [
      { label: "Cultura y Valores", href: "#" },
      { label: "Oportunidades de Trabajo", href: "#" },
      { label: "Beneficios para Empleados", href: "#" },
      { label: "Diversidad e Inclusion", href: "#" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { platform: "Facebook", href: "#", icon: "facebook" },
  { platform: "Twitter", href: "#", icon: "twitter" },
  { platform: "Instagram", href: "#", icon: "instagram" },
];
