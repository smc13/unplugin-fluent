import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { glob } from 'tinyglobby'
import { createUnplugin } from 'unplugin'
import type { UnpluginFactory } from 'unplugin'
import type { Options, ResolvedOptions } from './types'
import { formatFtl } from './core/format'
import { isFluentImport, normaliseFluentPath, resolveImportPath } from './core/loader'
import { resolveOptions } from './core/options'
import { generateTypescriptTypes } from './core/export'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const resolved = resolveOptions(options)

  return {
    name: 'unplugin-fluent',
    resolveId(id: string) {
      if (isFluentImport(id)) {
        return normaliseFluentPath(id)
      }
    },
    async buildStart() {
      const config = await resolved
      writeTypesFile(config)
    },
    loadInclude(id: string) {
      return isFluentImport(id)
    },
    async load(id: string) {
      const config = await resolved

      const resolvedLang = resolveImportPath(id)
      if (!resolvedLang) {
        return null
      }

      const files = await glob(config.filesGlob, {})
      if (!files.length) {
        this.warn(`No files found for glob: ${config.filesGlob}`)
        return null
      }

      switch (resolvedLang) {
        case 'all':
          return buildLangMap(files, config)
        default:
          return buildLangBundle(files, resolvedLang, config)
      }
    },

    async watchChange(id: string) {
      // TODO: improve this using the glob pattern
      const isFluentFile = id.endsWith('.ftl')
      if (isFluentFile) {
        const config = await resolved
        await writeTypesFile(config)
      }
    },
  }
}

function buildLangMap(files: string[], config: ResolvedOptions): string {
  const langs = new Set<string>()
  for (const file of files) {
    const lang = config.languageResolver(file)
    if (lang) {
      langs.add(lang)
    }
  }

  const mapped = Array.from(langs).map(lang =>
    `'${lang}': () => import('virtual:fluent/langs/${lang}')`,
  )

  return `export default {\n${mapped.join(',\n')}\n}`
}

function buildLangBundle(files: string[], lang: string, config: ResolvedOptions): string {
  const langFiles = files.filter(file => config.languageResolver(file) === lang)
  const response = [
    'import { FluentBundle, FluentResource } from "@fluent/bundle"',
    '',
    'export const resources = [',
  ]
  for (const file of langFiles) {
    let content = readFileSync(file).toString()
    if (config.format) {
      content = formatFtl(content)
    }

    response.push(`new FluentResource(\`${content}\`),`)
  }

  response.push(']')
  response.push(`
        const bundle = new FluentBundle('${lang}')
        for (const resource of resources) {
          bundle.addResource(resource)
        }

        export default bundle
      `)

  return response.join('\n')
}

async function writeTypesFile(config: ResolvedOptions): Promise<void> {
  if (!config.writeTypes) {
    return
  }

  const files = await glob(config.filesGlob, {})
  const outputFile = typeof config.writeTypes === 'string' ? config.writeTypes : 'fluent-types.d.ts'
  const output = await generateTypescriptTypes(files, config)

  writeFileSync(outputFile, output, { encoding: 'utf-8' })
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
