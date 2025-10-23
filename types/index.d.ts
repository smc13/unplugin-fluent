declare module 'virtual:fluent/langs/*' {
  import type { FluentResource } from '@fluent/bundle'

  export const language: string
  export const resources: FluentResource[]
}

declare module 'virtual:fluent/langs/all' {
  import type { FluentResource } from '@fluent/bundle'

  const FluentLangMap: Map<string, () => Promise<{ resources: FluentResource[], language: string }>>
  export default FluentLangMap
}

declare module '~fluent/langs/*' {
  import type { FluentResource } from '@fluent/bundle'

  export const language: string
  export const resources: FluentResource[]
}

declare module '*.ftl' {
  import type { FluentResource } from '@fluent/bundle'

  export const language: string
  export const resources: FluentResource[]
}

declare module '~fluent/langs/all' {
  import type { FluentResource } from '@fluent/bundle'

  const FluentLangMap: Map<string, () => Promise<{ resources: FluentResource[], language: string }>>
  export default FluentLangMap
}
