# @anchanix/unplugin-fluent

Plugin for Vite and other bundlers to easily import
[project fluent](https://projectfluent.org/) bundles.

## Install

```bash
pnpm add @anchanix/unplugin-fluent
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import fluent from '@anchanix/unplugin-fluent/vite'

export default defineConfig({
  plugins: [
    fluent({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import fluent from '@anchanix/unplugin-fluent/rollup'

export default {
  plugins: [
    fluent({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@anchanix/unplugin-fluent/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['@anchanix/unplugin-fluent/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@anchanix/unplugin-fluent/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import fluent from '@anchanix/unplugin-fluent/esbuild'

build({
  plugins: [fluent()],
})
```

<br></details>

## Usage

### Importing a single language bundle
```ts
import enBundle from 'virtual:fluent/langs/en-AU'
```

### Dynamically loading bundles
To dynamically load bundles you first have to import the bundle map:
```ts
import bundleMap from 'virtual:fluent/langs/all'
```

and then in a function you can use the map to load a bundle

```ts
async function switchLang(langCode: string) {
  if (!bundleMap[langCode]) {
    throw new Error(`Language not supported: ${langCode}`)
  }

  const bundleImport = await bundleMap[langCode]
  const bundle = bundleImport.default

  // start using the bundle
}
```
