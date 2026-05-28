import nextra from "nextra"
import { fileURLToPath } from "node:url"
import path from "node:path"

const withNextra = nextra({
  defaultShowCopyCode: true
})

const repoRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)))

export default withNextra({
  basePath: "/weapp",
  images: {
    unoptimized: true
  },
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: repoRoot
  }
})
