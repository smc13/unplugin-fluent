import { readFileSync } from 'node:fs'
import { exportTypescript, mergeParsed, parseContent } from '@anchanix/fluent-utils'
import type { KeyedParsedPlaceable } from '@anchanix/fluent-utils'
import type { ResolvedOptions } from '../types'

export async function generateTypescriptTypes(files: string[], config: ResolvedOptions): Promise<string> {
  const infos: KeyedParsedPlaceable[] = []

  for (const file of files) {
    const content = readFileSync(file, { encoding: 'utf-8' })

    const { messages } = parseContent(content)
    infos.push(messages)
  }

  const langs = new Set<string>()
  for (const file of files) {
    const lang = config.languageResolver(file)
    if (lang) {
      langs.add(lang)
    }
  }

  return exportTypescript(mergeParsed(...infos), Array.from(langs))
}
