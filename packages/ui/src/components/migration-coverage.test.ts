import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

const repoRoot = path.resolve(fileURLToPath(new URL("../../../../", import.meta.url)))

const migratedComponentFiles = [
  "action-sheet",
  "accordion",
  "activity-indicator",
  "article",
  "alert",
  "aspect-ratio",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "button-group",
  "calendar",
  "card",
  "carousel",
  "checkbox",
  "collapsible",
  "countdown",
  "curtain",
  "data-list",
  "date-picker",
  "dialog",
  "divider",
  "drawer",
  "empty",
  "fab",
  "field",
  "flex",
  "float-layout",
  "form",
  "grid",
  "icon",
  "image",
  "image-picker",
  "indexes",
  "input",
  "input-group",
  "input-number",
  "input-otp",
  "item",
  "label",
  "list",
  "load-more",
  "loading",
  "message",
  "modal",
  "nav-bar",
  "notice-bar",
  "pagination",
  "picker",
  "picker-view",
  "progress",
  "popover",
  "radio-group",
  "range",
  "rate",
  "safe-area",
  "scroll-area",
  "search-bar",
  "select",
  "separator",
  "segmented-control",
  "sheet",
  "skeleton",
  "slider",
  "spinner",
  "steps",
  "swipe-action",
  "switch",
  "tab-bar",
  "table",
  "tabs",
  "tag",
  "textarea",
  "toast",
  "toggle",
  "toggle-group",
  "timeline",
  "typography"
]

function readRepoFile(filePath: string) {
  return readFileSync(path.join(repoRoot, filePath), "utf8")
}

describe("legacy mini-program migration coverage", () => {
  it("migrates the old UI component surface into packages/ui", () => {
    const componentIndex = readRepoFile("packages/ui/src/components/index.ts")
    const missingFiles = migratedComponentFiles.filter(
      (name) => !existsSync(path.join(repoRoot, "packages/ui/src/components", `${name}.tsx`))
    )
    const missingExports = migratedComponentFiles.filter(
      (name) => !componentIndex.includes(`"./${name}"`)
    )

    expect(missingFiles).toEqual([])
    expect(missingExports).toEqual([])
  })

  it("keeps helper primitives available for source-registry installs", () => {
    for (const filePath of [
      "packages/ui/src/primitives/box.tsx",
      "packages/ui/src/primitives/input-base.tsx",
      "packages/ui/src/primitives/pressable.tsx",
      "packages/ui/src/primitives/text.tsx",
      "packages/ui/src/lib/create-strict-context.tsx",
      "packages/ui/src/lib/use-controllable-state.ts"
    ]) {
      expect(existsSync(path.join(repoRoot, filePath)), filePath).toBe(true)
    }
  })

  it("restores the old categorized mini-program demo structure", () => {
    const catalogPath = path.join(repoRoot, "apps/miniprogram/src/demo/catalog.ts")
    const appConfig = readRepoFile("apps/miniprogram/src/app.config.ts")

    expect(existsSync(catalogPath)).toBe(true)
    expect(appConfig).toContain("demoAppPages")
    expect(appConfig).toContain("demoSubpackages")

    if (existsSync(catalogPath)) {
      const catalog = readFileSync(catalogPath, "utf8")
      for (const category of ["basic", "view", "action", "form", "layout", "navigation", "advanced"]) {
        expect(catalog).toContain(`id: "${category}"`)
      }
      expect(catalog).toContain("pages/panel/index")
      expect(catalog).toContain("pages/form/input/index")
    }
  })

  it("keeps manual verification demos registered in the mini-program playground", () => {
    const catalog = readRepoFile("apps/miniprogram/src/demo/catalog.ts")

    for (const component of [
      { route: "pages/action/alert/index", slug: "alert" },
      { route: "pages/action/dialog/index", slug: "dialog" },
      { route: "pages/action/fab/index", slug: "fab" },
      { route: "pages/action/loading/index", slug: "loading" },
      { route: "pages/form/field/index", slug: "field" },
      { route: "pages/form/input-group/index", slug: "input-group" },
      { route: "pages/form/input-otp/index", slug: "input-otp" },
      { route: "pages/form/date-picker/index", slug: "date-picker" },
      { route: "pages/form/select/index", slug: "select" },
      { route: "pages/layout/collapsible/index", slug: "collapsible" },
      { route: "pages/view/image/index", slug: "image" },
      { route: "pages/basic/button-group/index", slug: "button-group" }
    ]) {
      expect(catalog).toContain(`slug: "${component.slug}"`)
      expect(catalog).toContain(`route: "${component.route}"`)
      expect(
        existsSync(path.join(repoRoot, "apps/miniprogram/src", `${component.route}.tsx`)),
        component.route
      ).toBe(true)
    }
  })

  it("publishes migrated components through the registry contract", () => {
    const manifest = readRepoFile("packages/registry/src/manifest.ts")

    for (const name of ["button", "icon", "action-sheet", "calendar", "date-picker", "select", "grid", "form", "toast"]) {
      expect(manifest).toContain(`"${name}"`)
    }
    expect(manifest).toContain('name: "primitives"')
    expect(manifest).toContain('name: "state"')
  })
})
