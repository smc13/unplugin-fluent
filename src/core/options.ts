import type { Options, ResolvedOptions } from '../types'
import process from 'node:process'
import { parseLangCodeFromPath } from '@anchanix/fluent-utils'

export async function resolveOptions(options: Options = {}): Promise<ResolvedOptions> {
  const {
    filesGlob = '**/*.ftl',
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
