# Twip — Tailwind-flavored web components

A framework-agnostic, MIT-licensed component library inspired by the patterns
popularized by Tailwind UI / Tailwind Plus. Built with [Lit](https://lit.dev),
styled with [Tailwind CSS](https://tailwindcss.com), and shipped as standard
custom elements so the same components work in **React**, **Vue**, **Svelte**,
**Angular**, **vanilla HTML**, and **Django templates**.

> **Note on scope.** Tailwind Plus is a proprietary, paid product from Tailwind
> Labs. Twip is an independent, original implementation of common UI patterns
> (buttons, alerts, dialogs, etc.) styled with Tailwind utilities. It is **not**
> a copy of Tailwind Plus's markup or assets.

## Table of contents

- [Features](#features)
- [Install](#install)
- [Quick start](#quick-start)
- [Framework integration](#framework-integration)
- [Tree-shaking](#tree-shaking)
- [Theming with Tailwind](#theming-with-tailwind)
- [Components](#components)
- [Development](#development)
- [Project layout](#project-layout)

## Features

- **Framework-agnostic.** Standard web components, no per-framework wrappers
  required.
- **Tree-shakeable.** Each component is its own ESM chunk. Import only the
  registration modules you need.
- **Tailwind theming.** All components style themselves from your Tailwind
  config. Change brand colors once, see them everywhere.
- **Native dialog.** Modal is built on the platform `<dialog>` element — focus
  trapping, top-layer rendering, and Escape-to-close come for free.
- **Form-associated.** Inputs and switches use `ElementInternals` so they
  participate in native form submission.
- **Storybook.** Every component documented and deployed to GitHub Pages.
- **Bun-first DX.** Bun for installs, scripts, and tests (`bun test`).

## Install

This package targets **Bun ≥ 1.3** for development. End consumers can install it
from any package manager.

```bash
bun add @twip/components
# or
npm install @twip/components
```

## Quick start

```html
<link rel="stylesheet" href="@twip/components/styles.css" />
<script type="module">
  // Register just what you need:
  import '@twip/components/define/button';
  import '@twip/components/define/modal';
</script>

<twip-button>Save</twip-button>
```

Or register everything at once during prototyping:

```ts
import '@twip/components/styles.css';
import '@twip/components/define/all';
```

## Framework integration

### React

```tsx
import '@twip/components/define/button';

export function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    // Listen to namespaced custom events with React's standard event syntax
    // via the `onTwip-click` lowercased prop (React 19) or addEventListener.
    <twip-button ref={(el) => el?.addEventListener('twip-click', onClick)}>
      Save
    </twip-button>
  );
}
```

For type-safe JSX, augment `JSX.IntrinsicElements`:

```ts
import type { TwipButton } from '@twip/components';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'twip-button': React.DetailedHTMLProps<React.HTMLAttributes<TwipButton>, TwipButton>;
    }
  }
}
```

### Vue 3

Vue treats unknown tags as custom elements when you configure
`compilerOptions.isCustomElement`:

```ts
// vite.config.ts
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('twip-'),
        },
      },
    }),
  ],
};
```

```vue
<script setup lang="ts">
import '@twip/components/define/button';

const onSave = (event: CustomEvent<MouseEvent>) => console.log(event);
</script>

<template>
  <twip-button @twip-click="onSave">Save</twip-button>
</template>
```

### Vanilla HTML / Svelte / Angular

Drop the script tag(s) and use the elements directly. No wrappers needed.

### Django

Install the [`django-twip`](./packages/django-twip) companion package:

```bash
pip install django-twip
```

```django
{% load twip %}
{% twip_assets only="button,modal,input" %}

<twip-button>Save</twip-button>
```

## Tree-shaking

Twip ships **three** import shapes so you can pick your trade-off:

| Import                           | Side effects       | Use when                                                    |
| -------------------------------- | ------------------ | ----------------------------------------------------------- |
| `@twip/components`               | None               | You want classes/types only, registering elements yourself. |
| `@twip/components/define/<name>` | Registers one tag  | You want per-component registration with tree-shaking.      |
| `@twip/components/define/all`    | Registers all tags | Prototyping, Django, or tiny apps.                          |

The `package.json` declares `sideEffects` so that bundlers (Vite, Webpack,
esbuild, Rollup, Bun) can safely drop registration modules you don't import.

Combined with Tailwind's `content` purging on your end, an app using just two
components ends up with two components' worth of code _and_ only the Tailwind
classes those components actually use.

## Theming with Tailwind

The Tailwind config lives at the repo root and exposes a `brand` color scale
(indigo by default). Override it once to re-skin everything:

```js
// tailwind.config.js (consumer side, if you rebuild Twip)
export default {
  presets: [require('@twip/components/tailwind.preset.cjs')],
  theme: {
    extend: {
      colors: {
        brand: require('tailwindcss/colors').emerald,
      },
    },
  },
};
```

You can also style individual instances via `::part` selectors:

```css
twip-button::part(button) {
  letter-spacing: 0.04em;
}
```

## Components

Initial component set:

- `twip-alert` — Inline message with tone, heading, dismiss control.
- `twip-avatar` — User avatar with image, initials fallback, status dot.
- `twip-badge` — Pill / chip with tone and variant.
- `twip-button` — Buttons and link-styled buttons with variants and loading state.
- `twip-card` — Surface container with header / body / footer slots.
- `twip-dropdown` — Menu with keyboard navigation and outside-click dismiss.
- `twip-input` — Form-associated text input with label, help, and error states.
- `twip-modal` — Built on the native `<dialog>` element.
- `twip-switch` — Form-associated toggle.
- `twip-tabs` — Tablist with three variants (underline, pill, segmented).
- `twip-tooltip` — Accessible hover/focus tooltip.

See Storybook for live examples and props.

## Development

```bash
# Install deps
bun install

# Vanilla HTML playground at http://localhost:5173
bun run dev

# Storybook at http://localhost:6006
bun run storybook

# Tests
bun test

# Lint, format, typecheck
bun run lint
bun run format:check
bun run typecheck

# Production build (dist/)
bun run build
```

### Pre-commit hooks

The repo uses [Husky](https://typicode.github.io/husky/) + lint-staged.
After `bun install`, `bun run prepare` wires up:

- **pre-commit:** runs `eslint --fix` and `prettier --write` on staged files.
- **pre-push:** runs `bun run typecheck && bun test`.

### Adding a new component

1. Create `src/components/<name>/<name>.ts` extending `TwipElement`.
2. Add `src/components/<name>/index.ts` exporting the class.
3. Add `src/define/<name>.ts` that calls `defineElement('twip-<name>', Class)`.
4. Re-export from `src/index.ts` and `src/define/all.ts`.
5. Add `src/components/<name>/<name>.test.ts` and `stories/<Name>.stories.ts`.

Vite's library entry list is generated by reading those folders, so no
config edits are needed.

## Project layout

```
.
├── .github/workflows/        # CI + Storybook deploy
├── .husky/                   # Git hooks
├── .storybook/               # Storybook config
├── packages/
│   └── django-twip/          # Python package for Django integration
├── scripts/                  # Build / sync utilities
├── src/
│   ├── components/<name>/    # Component class + index + test
│   ├── define/<name>.ts      # Per-component registration entry
│   ├── internal/             # Shared base class and helpers
│   ├── styles/               # Tailwind entry CSS
│   └── index.ts              # Tree-shakeable root export
├── stories/                  # Storybook stories
├── tests/                    # Test setup helpers
├── bunfig.toml               # bun test config
├── eslint.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## License

MIT
