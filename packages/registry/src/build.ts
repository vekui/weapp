import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { buildRegistryIndex, buildRegistryItem } from "./index.js"
import { registryItems } from "./manifest.js"

const repoRoot = path.resolve(fileURLToPath(new URL("../../..", import.meta.url)))
const outputDir = path.join(repoRoot, "apps/docs/public/r")

export async function buildRegistry(output = outputDir) {
  await mkdir(output, { recursive: true })

  const index = buildRegistryIndex()
  await writeFile(path.join(output, "index.json"), `${JSON.stringify(index, null, 2)}\n`)

  for (const item of registryItems) {
    const built = await buildRegistryItem(item)
    await writeFile(path.join(output, `${item.name}.json`), `${JSON.stringify(built, null, 2)}\n`)
  }

  return {
    count: registryItems.length,
    output
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildRegistry()
    .then((result) => {
      console.log(`Built ${result.count} registry items into ${result.output}`)
    })
    .catch((error: unknown) => {
      console.error(error)
      process.exit(1)
    })
}
