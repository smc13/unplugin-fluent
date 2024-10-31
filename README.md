# @anchanix/unplugin-fluent

[![NPM version](https://img.shields.io/npm/v/@anchanix/unplugin-fluent?color=a1b858&label=)](https://www.npmjs.com/package/@anchanix/unplugin-fluent)

Starter template for [unplugin](https://github.com/unjs/unplugin).

## Template Usage

To use this template, clone it down using:

```bash
npx degit unplugin/@anchanix/unplugin-fluent my-unplugin
```

And do a global replacement of `@anchanix/unplugin-fluent` with your plugin name.

Then you can start developing your unplugin 🔥

To test your plugin, run: `pnpm run dev`
To release a new version, run: `pnpm run release`

## Install

```bash
npm i @anchanix/unplugin-fluent
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from '@anchanix/unplugin-fluent/vite'

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from '@anchanix/unplugin-fluent/rollup'

export default {
  plugins: [
    Starter({ /* options */ }),
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
import Starter from '@anchanix/unplugin-fluent/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>
