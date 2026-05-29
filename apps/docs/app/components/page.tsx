import { readFile } from "node:fs/promises"
import path from "node:path"
import { ComponentsPageClient } from "./components-page-client"
import { componentCatalog } from "./catalog"

const repoRoot = path.resolve(process.cwd(), "../..")

async function getComponentSourceMap() {
  const entries = await Promise.all(
    componentCatalog.map(async (component) => {
      if (!component.source) {
        return undefined
      }

      const source = await readFile(path.join(repoRoot, component.source), "utf8")
      return [component.slug, source] as const
    })
  )

  return Object.fromEntries(entries.filter((entry): entry is readonly [string, string] => Boolean(entry)))
}

export default async function ComponentsPage() {
  const componentSources = await getComponentSourceMap()

  return <ComponentsPageClient componentSources={componentSources} />
}
