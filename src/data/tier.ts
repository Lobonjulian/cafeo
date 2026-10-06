import type { Product } from "../type/Product";

export const tier: Product[] = [
  {
    id: "tier-25",
    name: "Espresso",
    stars: 25,
    description: "un shot de espresso recién hecho",
    image: "/images/tier-25.jpg",
  },
  {
    id: "tier-50",
    stars: 50,
    name: "Café con leche",
    description: "un shot de espresso con leche",
    image: "/images/tier-50.jpg",
  },
  {
    id: "tier-150",
    stars: 150,
    name: "Café con leche y chocolate",
    description: "un shot de espresso con leche y chocolate",
    image: "/images/tier-150.jpg",
  },
  {
    id: "tier-200",
    stars: 200,
    name: "Desayuno",
    description: "un shot desayuno completo a base de café",
    image: "/images/tier-200.png",
  },
  {
    id: "tier-400",
    stars: 400,
    name: "Mercancía",
    description: "Lujosos productos de Cafeo Rewards",
    image: "/images/tier-400.png",
  },
]