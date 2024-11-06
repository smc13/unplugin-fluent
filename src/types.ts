export interface Options {
  filesGlob?: string | string[]
  format?: boolean
  writeTypes?: boolean | string
  root?: string
  languageResolver?: (file: string) => string | undefined | null
}

export type ResolvedOptions = Required<Options>
