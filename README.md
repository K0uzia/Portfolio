# Portfolio - Alexandre Kouziaeff

Astro
Tailwind CSS
GSAP
TypeScript
Font Awesome
Node
Deploy

Portfolio bilingue **EN/FR** avec navigation “rail”, mode **clair/sombre**, animations **GSAP**, et une URL “propre” par section (ex. `/fr/accueil`, `/en/work`) tout en conservant un rendu **Astro** rapide et SEO-friendly.

Le site public ciblé par la config Astro est `https://kouziaeff-alexandre.netlify.app`.

## Ce que contient le projet

- **Pages & contenus**: une page unique (home) organisée en sections (`home`, `about`, `work`) + contenus EN/FR séparés dans `src/site.ENconfig.ts` et `src/site.FRconfig.ts`.
- **UI & design system**: rendu Astro + utilitaires Tailwind (thème via variante `dark:`).
- **Animations & interactions**: GSAP + ScrollTrigger pour l’apparition des blocs, scrollspy, transitions de langue/thème, et micro-interactions.
- **SEO**: canonical/OG/Twitter + JSON-LD injectés dans `src/layouts/Layout.astro`, sitemap via `@astrojs/sitemap`.

## Comment ça “communique” (architecture)

### 1) Routage i18n “URL propre” → home unique (SSR/edge)

- **Entrée**: l’utilisateur arrive sur `/en/...` ou `/fr/...`.
- **Middleware** (`src/middleware.ts`):
  - détecte la langue à partir du chemin et la met dans `Astro.locals.lang`
  - réécrit les URLs de type `/en/home`, `/fr/accueil`, etc. vers `/` (la home Astro), pour servir une **single page** tout en gardant des URLs lisibles.
- **Netlify redirects** (`public/_redirects`):
  - assure le fallback SPA (`/en/`* et `/fr/*` → `/index.html`) pour que les refresh/partages d’URL restent fonctionnels.

### 2) Rendu serveur (Astro) → “bootstrap” client

- **Layout** (`src/layouts/Layout.astro`) centralise:
  - imports CSS
  - metas SEO + JSON-LD
  - scripts inline très tôt pour appliquer le **thème** et la **langue** persistés (localStorage) sans flash
  - l’injection de la navigation (`src/components/navside.astro`)
  - le lancement du client avec `boot()` (`src/scripts/client/boot.ts`)

### 3) Orchestration côté client (un point d’entrée)

Le module `src/scripts/client/boot.ts` initialise toutes les briques interactives et gère le nettoyage via `AbortController` (important avec Astro et le rechargement en dev):

- **Préférences**:
  - **Thème**: `src/scripts/client/theme-toggle.ts` (stockage `portfolio-theme`)
  - **Langue**: `src/scripts/client/lang-toggle.ts` + clé partagée `src/lib/lang-storage.ts` (stockage `portfolio-lang`)
- **Navigation**:
  - scrollspy + URL par section (sans hash): `src/scripts/client/nav-rail.ts`
  - menu mobile: `src/scripts/client/mobile-menu.ts`
- **Animations**:
  - GSAP/ScrollTrigger enregistrés dans `src/scripts/client/register-gsap.ts`
  - apparitions des sections (hero/about/work/404/nav): `src/scripts/client/*-appear.ts`
- **Comportements UI**:
  - tooltips, loaders d’images, galerie projets, chips stack, etc.

### 4) Contrat “sections ↔ URLs” (mapping stable EN/FR)

Le mapping entre **sections** et **slugs localisés** est centralisé dans `src/lib/section-path.ts`:

- `pathFor(lang, section)` produit `/en/home`, `/fr/accueil`, etc.
- `parsePathname(pathname)` récupère `{ lang, section }`

Ce contrat est utilisé par:

- le **middleware** (pour savoir quand réécrire)
- le **nav rail** (scrollspy + `history.replaceState` sur la section active)
- le **switch langue** (pour garder l’utilisateur sur la même section après bascule)

## Dossiers importants

- `src/layouts/`: layout global (SEO, scripts early, nav, boot)
- `src/components/`: UI Astro (nav, hero, etc.)
- `src/site.ENconfig.ts` / `src/site.FRconfig.ts`: textes, labels et contenus par langue
- `src/lib/`: utilitaires partagés (i18n storage, mapping sections↔paths…)
- `src/scripts/client/`: interactions/animations (GSAP, navigation, toggles…)
- `public/_redirects`: règles Netlify pour le fallback des routes `/en/`* et `/fr/*`

## Stack technique

- **Astro**: rendu + build (`astro.config.mjs`) + sitemap
- **Tailwind CSS v4**: utilitaires + variante `dark:`
- **GSAP v3 + ScrollTrigger**: animations UI et scroll
- **TypeScript**: scripts client et utilitaires
- **Font Awesome**: icônes

