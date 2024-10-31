const IMPORT_PATHS = ['virtual:fluent', '~fluent']
const importPathRegex = new RegExp(`${IMPORT_PATHS.map(v => `^${v}`).join('|')}`)

export function isFluentImport(id: string): boolean {
  return importPathRegex.test(id)
}

export function normaliseFluentPath(id: string): string {
  return id.replace(importPathRegex, IMPORT_PATHS[0])
}

export function resolveImportPath(path: string): string | null {
  if (!isFluentImport(path))
    return null

  path = path.replace(importPathRegex, '')

  const parts = path.split('/')
  return parts[parts.length - 1]
}
