import type { PaymentMethod } from "../type/PaymentMethod";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "free",
    title: "Paga como quieras",
    description: "usa efectivo o tarjeta de crédito/débito en la caja registradora",
    stars: "1★ por cada $1",
    image: "https://placehold.co/180",
  },
  {
    id: "recarga",
    title: "Recarga",
    description:
      "Añade fondos a tus cuentas para ganar Estrellas el doble de rápido y mas dinero en tus tarjeta digital Cafeo usando cualquier método de pago",
    stars: "2★ por cada $1",
    image: "https://placehold.co/180",
  },
  {
    id: "gift-card",
    title: "Tarjeta Visa de Cafeo Rewards",
    description:
      "Gana Estrellas en todas las compras que realizas con nuestra tarjeta de crédito o débito fuera de Cafeo.Gana 1 Estrella por euro cuando utilizas regularmente la Tarjeta Visa Cafeo Rewards",
    stars: "3★ por cada $1",
    image: "https://placehold.co/180",
  },
];
