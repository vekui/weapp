import { access, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const defaultDistRoot = path.join(repoRoot, "apps/miniprogram/dist")
const appOriginImportPattern = /@import\s+["']app-origin\.wxss["'];/
const relativeAppOriginImport = '@import "./app-origin.wxss";'

export async function normalizeMiniprogramWxssImports(distRoot = defaultDistRoot) {
  const appWxssPath = path.join(distRoot, "app.wxss")
  const appOriginWxssPath = path.join(distRoot, "app-origin.wxss")
  const source = await readFile(appWxssPath, "utf8")

  if (!appOriginImportPattern.test(source)) {
    return false
  }

  await access(appOriginWxssPath)

  const normalized = source.replace(appOriginImportPattern, relativeAppOriginImport)
  await writeFile(appWxssPath, normalized, "utf8")

  return true
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const distRoot = process.argv[2] ? path.resolve(process.argv[2]) : defaultDistRoot
  await normalizeMiniprogramWxssImports(distRoot)
}
