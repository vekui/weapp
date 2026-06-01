import { access, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const docsRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)))
const repoRoot = path.resolve(docsRoot, "../..")
const qrFileName = "wechat-official-account-qr.jpg"
const qrPublicPath = `/weapp/${qrFileName}`
const qrRepoPath = `apps/docs/public/${qrFileName}`

const readme = await readFile(path.join(repoRoot, "README.md"), "utf8")
const layout = await readFile(path.join(docsRoot, "app/layout.tsx"), "utf8")
const siteCss = await readFile(path.join(docsRoot, "app/site.css"), "utf8")

function assertIncludes(source, expected, message) {
  if (!source.includes(expected)) {
    throw new Error(message)
  }
}

function assertOrdered(source, first, second, message) {
  const firstIndex = source.indexOf(first)
  const secondIndex = source.indexOf(second)

  if (firstIndex === -1 || secondIndex === -1 || firstIndex > secondIndex) {
    throw new Error(message)
  }
}

await access(path.join(docsRoot, "public", qrFileName))

assertIncludes(readme, qrRepoPath, "README should render the WeChat official account QR code.")
assertIncludes(readme, "关注公众号", "README should label the WeChat official account QR code.")

assertIncludes(layout, qrPublicPath, "Docs footer should render the public QR image.")
assertIncludes(layout, "关注公众号", "Docs footer should label the WeChat official account QR code.")
assertIncludes(layout, "vekui-site-footer__qr", "Docs footer should expose a stable QR styling hook.")
assertOrdered(
  layout,
  `src="${qrPublicPath}"`,
  "关注公众号",
  "Docs footer should place the WeChat official account label below the QR code."
)

assertIncludes(siteCss, ".vekui-site-footer", "Docs footer should have a custom layout style.")
assertIncludes(siteCss, ".vekui-site-footer__qr img", "Docs footer QR image should have stable sizing.")
assertIncludes(siteCss, "flex-direction: column;", "Docs footer QR block should stack the QR code over its label.")
assertIncludes(siteCss, "text-align: center;", "Docs footer QR block should center its label.")
assertIncludes(siteCss, "height: 128px;", "Docs footer QR image should be large enough to scan comfortably.")
assertIncludes(siteCss, "width: 128px;", "Docs footer QR image should be large enough to scan comfortably.")

console.log("Site footer checks passed.")
