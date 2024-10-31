import { parseLangCodeFromPath } from '@anchanix/fluent-utils'
import type { Options, ResolvedOptions } from '../types'

export async function resolveOptions(options: Options = {}): Promise<ResolvedOptions> {
  const {
    filesGlob = '**/*.ftl',
    format = true,
    languageResolver = parseLangCodeFromPath,
    writeTypes = false,
  } = options

  return {
    filesGlob,
    format,
    languageResolver,
    writeTypes,
  }
}
