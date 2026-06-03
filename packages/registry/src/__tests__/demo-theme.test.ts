import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"
import { describe, expect, it } from "vitest"

import { demoThemes } from "../../../../apps/miniprogram/src/demo/theme-options"

const repoRoot = path.resolve(fileURLToPath(new URL("../../../../", import.meta.url)))
const themeSwitcherSource = readFileSync(
  path.join(repoRoot, "apps/miniprogram/src/demo/theme-switcher.tsx"),
  "utf8"
)
const indexPageSource = readFileSync(
  path.join(repoRoot, "apps/miniprogram/src/pages/index/index.tsx"),
  "utf8"
)
const panelPageSource = readFileSync(
  path.join(repoRoot, "apps/miniprogram/src/pages/panel/index.tsx"),
  "utf8"
)
const componentPageSource = readFileSync(
  path.join(repoRoot, "apps/miniprogram/src/pages/component/index.tsx"),
  "utf8"
)
const demoPageShellSource = readFileSync(
  path.join(repoRoot, "apps/miniprogram/src/demo/demo-page.tsx"),
  "utf8"
)
const tokenSource = readFileSync(path.join(repoRoot, "packages/ui/src/styles/index.css"), "utf8")

const requiredCssVariables = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--destructive-foreground",
  "--border",
  "--input",
  "--ring",
  "--radius"
] as const

function getThemeBlock(className: string) {
  const match = tokenSource.match(new RegExp(`\\.${className}\\s*\\{([^}]*)\\}`, "m"))
  return match?.[1] ?? ""
}

function getMinHeightRpx(source: string) {
  const match = source.match(/min-h-\[(\d+)rpx\]/)
  return Number(match?.[1] ?? 0)
}

describe("miniprogram demo theme switching", () => {
  it("defines touch-friendly theme options with swatch metadata", () => {
    expect(demoThemes).toHaveLength(3)
    expect(demoThemes.map((theme) => theme.id)).toEqual(["default", "learning", "warm"])

    for (const theme of demoThemes) {
      expect(theme.label).toMatch(/[\u4e00-\u9fa5]/)
      expect(theme.description).toMatch(/[\u4e00-\u9fa5]/)
      expect(theme.className).toBe(`theme-${theme.id}`)
      expect(theme.primaryColor).toMatch(/^#[0-9a-f]{6}$/)
      expect(theme.palette).toHaveLength(3)
      expect("swatches" in theme ? theme.swatches : undefined).toHaveLength(2)

      for (const swatch of "swatches" in theme ? theme.swatches : []) {
        expect(swatch.name).toMatch(/[\u4e00-\u9fa5]/)
        expect(swatch.className).toMatch(/^bg-(primary|accent|secondary)$/)
      }
    }
  })

  it("renders selected state and theme descriptions in the switcher", () => {
    expect(themeSwitcherSource).toContain('data-slot="demo-theme-switcher"')
    expect(themeSwitcherSource).toContain('data-slot="demo-theme-swatch"')
    expect(themeSwitcherSource).toContain('data-state={selected ? "selected" : "default"}')
    expect(themeSwitcherSource).toContain("theme.description")
    expect(themeSwitcherSource).toContain("theme.swatches.map")
    expect(getMinHeightRpx(themeSwitcherSource)).toBeGreaterThanOrEqual(88)
  })

  it("keeps theme switching on the entry page only", () => {
    expect(indexPageSource).toContain("<ThemeSwitcher")
    expect(indexPageSource).toContain("activeTheme.label")
    expect(indexPageSource).toContain("activeTheme.description")
    expect(indexPageSource).toContain("color={activeTheme.primaryColor}")
    expect(panelPageSource).toContain("color={activeTheme.primaryColor}")
    expect(indexPageSource).not.toMatch(/import\s*\{[^}]*\bgetDemoTheme\b/)
    expect(panelPageSource).not.toMatch(/import\s*\{[^}]*\bgetDemoTheme\b/)

    for (const source of [panelPageSource, componentPageSource, demoPageShellSource]) {
      expect(source).not.toContain("<ThemeSwitcher")
      expect(source).not.toContain("setThemeId")
    }
  })

  it("uses theme-backed palette data instead of fixed legacy color swatches", () => {
    for (const legacyColor of ["#78A4FA", "#6190E8", "#346FC2", "#13CE66", "#FF4949", "#FFC82C"]) {
      expect(demoPageShellSource).not.toContain(legacyColor)
    }

    for (const theme of demoThemes) {
      for (const item of theme.palette) {
        expect(item.name).toMatch(/[\u4e00-\u9fa5]/)
        expect(item.value).toMatch(/^#[0-9a-f]{6}$/)
        expect(item.className).toMatch(/^border-(primary|accent|secondary|border)$/)
      }
    }
  })

  it("keeps button state demos compact and scan-friendly", () => {
    expect(demoPageShellSource).toContain('data-slot="button-state-row"')
    expect(demoPageShellSource).toContain("flex flex-row flex-wrap items-center justify-start gap-3")
  })

  it("keeps every demo theme backed by a complete semantic token set", () => {
    for (const theme of demoThemes) {
      const block = getThemeBlock(theme.className)

      expect(block, `Missing .${theme.className} block`).not.toBe("")

      for (const cssVariable of requiredCssVariables) {
        expect(block, `${theme.className} is missing ${cssVariable}`).toContain(cssVariable)
      }
    }
  })
})
