import type { UnpluginFactory } from 'unplugin'
import type { Options, ResolvedOptions } from './core/options'
import { readFileSync, writeFileSync } from 'node:fs'
import MagicString, { Bundle } from 'magic-string'
import { globSync } from 'tinyglobby'
import { createUnplugin } from 'unplugin'
import { createFilter } from 'vite'
import { generateTypescriptTypes } from './core/export'
import { formatFtl } from './core/format'
import { isFluentImport, normaliseFluentPath, resolveImportPath } from './core/loader'
import { resolveOptions } from './core/options'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const resolved = resolveOptions(options)
  const ftlFilter = createFilter('**/*.ftl')
  let files: string[] = []

  return {
    name: 'unplugin-fluent',
    resolveId(id: string) {
      if (isFluentImport(id)) {
        return normaliseFluentPath(id)
      }
    },

    async buildStart() {
      const config = await resolved
      files = globSync(config.filesGlob, { onlyFiles: true, cwd: config.root })
      writeTypesFile(files, config)
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
      if (ftlFilter(id)) {
        const config = await resolved
        files = globSync(config.filesGlob, { onlyFiles: true, cwd: config.root })
        await writeTypesFile(files, config)
      }
    },

    async transform(code, id) {
      if (!ftlFilter(id)) {
        return
      }

      const config = await resolved
      if (config.format) {
        code = formatFtl(code)
      }

      const ms = new MagicString(code, { filename: id })
      ms.prepend(`import { FluentResource } from '@fluent/bundle'
        export const resource = new FluentResource(\`
      `)
      ms.append(`\`
        export const language = '${config.languageResolver(id)}'
      `)

      return { code: ms.toString(), map: ms.generateMap() }
    },

    vite: {
      handleHotUpdate: {
        order: 'post',
        handler: async ({ file, server }) => {
          if (ftlFilter(file)) {
            const config = await resolved
            const lang = config.languageResolver(file)
            const module = server.moduleGraph.getModuleById(`virtual:fluent/langs/${lang}`)
            if (!module) {
              return
            }

            return [module]
          }
        },
      },
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
    `['${lang}', () => import('virtual:fluent/langs/${lang}')]`,
  )

  return `export default new Map([${mapped.join(', ')}])`
}

function buildLangBundle(files: string[], lang: string, config: ResolvedOptions): { code: string, map: any } {
  const bundle = new Bundle({ separator: '\n' })
  const langFiles = files.filter(file => config.languageResolver(file) === lang)

  bundle.append(`
    import { FluentBundle, FluentResource } from "@fluent/bundle"
    export const language = '${lang}'
    export const resources = [
  `)

  for (const file of langFiles) {
    let content = readFileSync(file).toString()
    if (config.format) {
      content = formatFtl(content)
    }

    bundle.addSource({
      content: new MagicString(`new FluentResource(\`${content}\`),`),
      filename: file,
    })
  }

  bundle.append(`\n]\n`)

  return { code: bundle.toString(), map: bundle.generateMap() }
}

async function writeTypesFile(files: string[], config: ResolvedOptions): Promise<void> {
  if (!config.writeTypes) {
    return
  }

  const outputFile = typeof config.writeTypes === 'string' ? config.writeTypes : 'fluent-types.d.ts'
  const output = await generateTypescriptTypes(files, config)

  writeFileSync(outputFile, output, { encoding: 'utf-8' })
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
