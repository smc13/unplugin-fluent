import process from 'node:process'
import { parseLangCodeFromPath } from '@anchanix/fluent-utils'

export interface Options {
  filesGlob?: string | string[]
  format?: boolean
  writeTypes?: boolean | string
  root?: string
  languageResolver?: (file: string) => string | undefined | null
}

export type ResolvedOptions = Required<Options>

export async function resolveOptions(options: Options = {}): Promise<ResolvedOptions> {
  const {
    filesGlob = ['**/*.ftl', '!node_modules/**'],
    format = true,
    languageResolver = parseLangCodeFromPath,
    writeTypes = false,
    root = process.cwd(),
  } = options

  return {
    filesGlob,
    format,
    languageResolver,
    writeTypes,
    root,
  }
}
