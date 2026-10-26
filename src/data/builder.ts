import type { BaseOption, ExtraOption, SizeOption } from "../type/Builder";

export const baseOptions: BaseOption[] = [
  {
    id: "espresso",
    name: "Espresso",
    price: 5000,
    image: "/images/tier-25.jpg",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 8500,
    image: "/images/tier-50.jpg",
  },
  {
    id: "latte",
    name: "Latte",
    price: 14000,
    image: "/images/tier-200.png",
  },
];

export const sizeOptions: SizeOption[] = [
  {
    id: "small",
    name: "Pequeño (8oz)",
    priceMultiplier: 1.0,
  },
  {
    id: "medium",
    name: "Mediano (12oz)",
    priceMultiplier: 1.3,
  },
  {
    id: "large",
    name: "Grande (16oz)",
    priceMultiplier: 1.6,
  },
];

export const extraOptions: ExtraOption[] = [
  {
    id: "extra-shot",
    name: "Shot extra de espresso",
    price: 2000,
  },
  {
    id: "almond-milk",
    name: "Leche de almendra",
    price: 3000,
  },
  {
    id: "vanilla-syrup",
    name: "Jarabe de vainilla",
    price: 4500,
  },
];
