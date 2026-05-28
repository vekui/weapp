import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const uiRoot = path.join(root, "packages/ui/src")
const forbidden = [
  "@radix-ui/",
  "@nutui/",
  "antd-mobile",
  "vant",
  "taro-ui",
  "lucide-react",
  "ReactDOM",
  "window.",
  "document.",
  "HTMLElement",
  "createPortal"
]

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return collectFiles(entryPath)
      }
      if (/\.(ts|tsx|css)$/.test(entry.name)) {
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
  for (const token of forbidden) {
    if (content.includes(token)) {
      problems.push(`${path.relative(root, file)} contains forbidden token: ${token}`)
    }
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"))
  process.exit(1)
}

console.log("UI boundaries passed.")
