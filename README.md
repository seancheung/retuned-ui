# Retuned UI

A retuned, dark-first React component library built with [Tailwind CSS v4](https://tailwindcss.com), distributed as a [shadcn registry](https://ui.shadcn.com/docs/registry) hosted on GitHub. Components are copied into your project — you own the code and can tweak anything.

The design system features an amber primary palette, a layered dark base, an off-white content ladder, and semantic colors tuned for dark backgrounds, with [Geist](https://vercel.com/font) as the default typeface.

**[Live demo →](https://seancheung.github.io/retuned-ui/)** — typography, color system, and every component in action.

## Components

| | | | |
|---|---|---|---|
| Alert | Badge | Button | Checkbox |
| Combobox | Context Menu | Dialog | Drawer |
| Dropdown | Input | Input Number | Input Password |
| Knob | Menu | Progress | Radio |
| Select | Skeleton | Slider | Switch |
| Tabs | Table | Textarea | Toast |
| Toggle | Tooltip | | |

## Prerequisites

Your project needs:

- React 19
- Tailwind CSS v4
- A `@/*` path alias pointing at your source directory (e.g. `src/`)

## Installation

### 1. Install the base setup

The `setup` item installs the theme (`theme.css`) and the `cn` utility that every component depends on:

```sh
npx shadcn@latest add seancheung/retuned-ui/setup
```

Then import the theme into your global Tailwind CSS entry file:

```css
@import "tailwindcss";
@import "./theme.css";
```

### 2. Add components

Install any component by name. Registry dependencies (including `setup`) are resolved automatically:

```sh
npx shadcn@latest add seancheung/retuned-ui/button
npx shadcn@latest add seancheung/retuned-ui/dialog seancheung/retuned-ui/toast
```

You can pin to a specific ref (branch, tag, or commit):

```sh
npx shadcn@latest add seancheung/retuned-ui/button#main
```

Components are placed in `components/ui/` and npm dependencies (e.g. `class-variance-authority`, `@floating-ui/react`) are installed for you.

## Usage

```tsx
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function Example() {
  return (
    <Button onClick={() => toast.success("Saved!")}>
      Save
    </Button>
  );
}
```

The `toast()` API requires a `<Toaster />` outlet mounted once near the root of your app:

```tsx
import { Toaster } from "@/components/ui/toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
);
```

## Theming

Dark is the default theme. To switch to the light theme, set `data-theme="light"` on the root element:

```html
<html data-theme="light">
```

Toggle it at runtime from anywhere:

```ts
document.documentElement.dataset.theme = "light"; // or "dark"
```

All color tokens (`primary-*`, `base-*`, `content-*`, and semantic colors) are CSS variables defined in `theme.css`, so every component adapts automatically — no component code references a specific theme. You can also customize either theme by editing the token values in `theme.css`.

## Development

This repo doubles as a live showcase of every component:

```sh
npm install
npm run dev       # start the showcase (typography, colors, component demos)
npm run build     # build the showcase
npm run check     # lint + format check (biome)
npm run validate  # validate the shadcn registry
```

The showcase is deployed automatically to [GitHub Pages](https://seancheung.github.io/retuned-ui/) on every push to `main` (see `.github/workflows/deploy-pages.yml`).

The registry is defined by `registry.json` at the repo root, which includes `src/registry.json` (base setup) and `src/components/ui/registry.json` (components). Demo code for each component lives in `src/components/*-demo.tsx`.

## License

MIT
