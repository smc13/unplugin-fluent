/**
 * Format FTL content by removing empty lines, comments, etc.
 */
export function formatFtl(content: string) {
  // remove empty lines
  content = content.replace(/^\s*[\r\n]/gm, '')

  // remove comments
  content = content.replace(/#.*/g, '')

  return content
}
