# ☕ Cafeo - Plataforma de Fidelización

## 📌 Especificaciones Técnicas y Alcance

**Documento:** ESPEC-2026-005
**Version:** 0.1
**Fecha de release:** 10 de octubre de 2026
**Equipo:** Frontend Squad — Cafeo Inc.
**Roles:** Julian Lobón (Frontend Developer)
**Estado:** Fase 1 completada - Mockup listo

## 1. Resumen Ejecutivo

Landing del programa de recompensas de Cafeo.

Objetivo: conversion a membrecía mediante narrativa de Estrellas y Recompensas, con flujo de alta persistido localmente.

## 2. Alcance

### Fase 1: Mockup (COMPLETADA ✅)

- [x] Hero con CTA de registro al programa de recompensas
- [x] Sección "Comenzar es fácil" (3 pasos del programa)
- [x] Barra de progreso de recompensas (25★, 50★, 150★, 200★, 400★)
- [x] Sección "Personaliza tu bebida" (placeholder estático)
- [x] Sección "Extras sin fin" (3 tarjetas)
- [x] Sección "En efectivo o tarjeta" (3 métodos de pago)
- [x] Footer con 4 columnas de enlaces y redes sociales
- [x] Diseño responsive (mobile-first con breakpoints 425px, 768px)
- [x] Accesibilidad básica (ARIA labels, semántica HTML5)

### Pendiente (v0.2+)

- Backend real (simulación completa en frontend)
- Autenticación de usuarios
- Pasarela de pagos real
- Sistema de notificaciones push
- Internacionalización (i18n)
- PWA (Progressive Web App)
- Tests automatizados

## 3. Requisitos funcionales

| ID    | Requisito                                           | Prioridad | Estado      |
| ----- | --------------------------------------------------- | --------- | ----------- |
| RF-01 | Replica fiel del layout de referencia.              | Alta      | ✅ Hecho    |
| RF-O2 | Renderizar menú y recompensas desde datos tipados.  | Alta      | ✅ Hecho    |
| RF-03 | Carrito de compras con add/remove/update quantity.  | Alta      | 🚧 En curso |
| RF-04 | Persistencia del carrito en localStorage.           | Alta      | Pendiente   |
| RF-05 | Personalizar las bebidas con extras opcionales.     | Media     | Pendiente   |
| RF-06 | Cálculo automático de estrellas ganadas.            | Media     | Pendiente   |
| RF-07 | Accesibilidad básica: semántica, alt, foco visible. | Alta      | ✅ Hecho    |

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

- **Lenguaje:** TypeScript 7...
- **Bundler:** Vite 8.x
- **Gestor de paquetes:** pnpm
- **Estado global:** Custom Store pattern (sin librerías externas)
- **Estilos:** CSS3 con variables y nesting nativo
- **Fuentes:** against (display) + Kanit (body)

## 7. Changelog v0.1

- 0.1 (10 oct 2026): Mockup completo con 7 secciones data-driven
- 0.0 (kickoff): Setup de Vite + TypeScript, definición de arquitectura

## 8. Licencia

MIT © 2026 Julian Lobon
