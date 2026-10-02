# ☕ Cafeo - Plataforma de Fidelización

## 📌 Especificaciones Técnicas y Alcance

**Documento:** ESPEC-2026-005
**Version:** 0.1
**Fecha de release:** 02 de octubre de 2026
**Equipo:** Frontend Squad — Cafeo Inc.
**Roles:** Julian Lobón (Frontend Developer)
**Estado:** Kickoff - Setup en curso

## 1. Resumen Ejecutivo

Landing del programa de recompensas de Cafeo.

Objetivo: conversion a membrecía mediante narrativa de Estrellas y Recompensas, con flujo de alta persistido localmente.

## 2. Alcance (v0.1)

### Incluido

- replica fiel del layout de referencia
- Hero con CTA de registro al programa de recompensas.
  -Sección "Comenzar es fácil" (3 pasos del programa).
- Barra de progreso de recompensas (25★, 50★, 150★, 200★, 400★).
- Personalizador de bebidas (agregar extras: espresso, leche, sabor).
- Carrito de compras funcional con estado global.
- Persistencia del carrito en localStorage.
- Sección de métodos de pago y ganancias de estrellas.
- Footer con links corporativos.
- Render data-driven desde módulos TypeScript tipados.
- Navegación mediante anclas.
- Accesibilidad básica.

### Pendiente (v0.2)

- Backend real (simulación completa en frontend).
- Autenticación de usuarios.
- Pasarela de pagos real.
- Base de datos de productos.
- Sistema de notificaciones push.
- Internacionalización (i18n).
- PWA (Progressive Web App).
- Tests automatizados.

## 3. Requisitos funcionales

| ID    | Requisito                                           | Prioridad | Estado    |
| ----- | --------------------------------------------------- | --------- | --------- |
| RF-01 | Replica fiel del layout de referencia.              | Alta      | Pendiente |
| RF-O2 | Renderizar menú y recompensas desde datos tipados.  | Alta      | Pendiente |
| RF-03 | Carrito de compras con add/remove/update quantity.  | Alta      | Pendiente |
| RF-04 | Persistencia del carrito en localStorage.           | Alta      | Pendiente |
| RF-05 | Personalizador de bebidas con extras opcionales.    | Media     | Pendiente |
| RF-06 | Cálculo automático de estrellas ganadas.            | Media     | Pendiente |
| RF-07 | Accesibilidad básica: semántica, alt, foco visible. | Alta      | Pendiente |

## 4. Requisitos no funcionales

| ID     | Requisito                                                   |
| ------ | ----------------------------------------------------------- |
| RNF-01 | TypeScript estricto con Vite (primer bundler del proyecto). |
| RNF-02 | Hot Module Replacement (HMR) para desarrollo en vivo.       |
| RNF-03 | Minificación y tree-shaking automático en producción.       |
| RNF-04 | Estado global del carrito con patrón Observer/Store.        |
| RNF-05 | Capas: src/types/, src/data/, src/store/, src/components/.  |
| RNF-06 | Commits convencionales y DoD por subfase.                   |
| RNF-07 | Lighthouse: >90 Performance, >95 Accesibilidad, 100 SEO.    |

## 5. Stack tecnológico

- Lenguaje: TypeScript 7.0.2
- Bundler: Vite 6.x
- Gestor de paquetes: pnpm
- Estado global: Custom Store pattern (sin librerías externas)
- Estilos: CSS3 con variables y nesting nativo

## 7. Changelog v0.1

0.1 (kickoff): Especificación inicial, setup de Vite + TypeScript, definición de arquitectura de estado.

## 8. Licencia

MIT © 2026 Julian Lobon
