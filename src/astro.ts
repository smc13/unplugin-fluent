import type { Options } from './core/options'

import unplugin from '.'

export default (options: Options): any => ({
  name: '@anchanix/unplugin-fluent',
  hooks: {
    'astro:config:setup': async (astro: any) => {
      astro.config.vite.plugins ||= []
      astro.config.vite.plugins.push(unplugin.vite(options))
    },
  },
})
