declare module 'virtual:fluent/langs/*' {
  import type { FluentBundle, FluentResource } from '@fluent/bundle'

  export const resources: FluentResource[]
  export default FluentBundle
}

declare module 'virtual:fluent/langs/all' {
  import type { FluentBundle } from '@fluent/bundle'

  interface FluentLangImporter { [key: string]: () => Promise<{ default: FluentBundle }> }
  const FluentLangImporter: FluentLangImporter
  export default FluentLangImporter
}

declare module '~fluent/langs/*' {
  import type { FluentBundle, FluentResource } from '@fluent/bundle'

  export const resources: FluentResource[]
  export default FluentBundle
}

declare module '~fluent/langs/all' {
  import type { FluentBundle } from '@fluent/bundle'

  interface FluentLangImporter { [key: string]: () => Promise<{ default: FluentBundle }> | undefined }
  const FluentLangImporter: FluentLangImporter
  export default FluentLangImporter
}
