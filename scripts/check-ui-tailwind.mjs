import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const uiRoot = path.join(root, "packages/ui/src")
const forbiddenUtilities = ["space-x-", "space-y-", "translate-"]
const rawHexPattern = /className={[^}]*#[0-9a-fA-F]{3,8}|className="[^"]*#[0-9a-fA-F]{3,8}/

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return collectFiles(entryPath)
      }
      if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.includes(".test.")) {
        return [entryPath]
      }
      return []
    })
  )
  return files.flat()
}

const problems = []
for (const file of await collectFiles(uiRoot)) {
  const content = await readFile(file, "utf8")
  for (const utility of forbiddenUtilities) {
    if (content.includes(utility)) {
      problems.push(`${path.relative(root, file)} contains unsafe Tailwind utility: ${utility}`)
    }
  }
  if (rawHexPattern.test(content)) {
    problems.push(`${path.relative(root, file)} contains raw hex color in className`)
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"))
  process.exit(1)
}

console.log("UI Tailwind compatibility passed.")
