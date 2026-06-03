import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

const source = readFileSync(new URL("./index.css", import.meta.url), "utf8")

const themeSemanticColors = {
  "theme-default": {
    background: "0 0% 100%",
    foreground: "222 47% 11%",
    card: "0 0% 100%",
    "card-foreground": "222 47% 11%",
    popover: "0 0% 100%",
    "popover-foreground": "222 47% 11%",
    primary: "221 83% 53%",
    "primary-foreground": "0 0% 100%",
    secondary: "210 40% 96%",
    "secondary-foreground": "222 47% 11%",
    muted: "210 40% 96%",
    "muted-foreground": "215 16% 47%",
    accent: "174 62% 47%",
    "accent-foreground": "0 0% 100%",
    destructive: "0 84% 60%",
    "destructive-foreground": "0 0% 100%",
    border: "214 32% 91%",
    input: "214 32% 91%",
    ring: "221 83% 53%"
  },
  "theme-learning": {
    background: "204 33% 97%",
    foreground: "218 39% 11%",
    card: "0 0% 100%",
    "card-foreground": "218 39% 11%",
    popover: "0 0% 100%",
    "popover-foreground": "218 39% 11%",
    primary: "214 84% 56%",
    "primary-foreground": "0 0% 100%",
    secondary: "210 40% 94%",
    "secondary-foreground": "218 39% 11%",
    muted: "210 40% 94%",
    "muted-foreground": "215 20% 42%",
    accent: "158 64% 45%",
    "accent-foreground": "0 0% 100%",
    destructive: "0 84% 60%",
    "destructive-foreground": "0 0% 100%",
    border: "214 32% 86%",
    input: "214 32% 86%",
    ring: "214 84% 56%"
  },
  "theme-warm": {
    background: "36 60% 97%",
    foreground: "24 36% 14%",
    card: "0 0% 100%",
    "card-foreground": "24 36% 14%",
    popover: "0 0% 100%",
    "popover-foreground": "24 36% 14%",
    primary: "18 88% 56%",
    "primary-foreground": "0 0% 100%",
    secondary: "34 48% 90%",
    "secondary-foreground": "24 36% 14%",
    muted: "34 48% 90%",
    "muted-foreground": "24 18% 40%",
    accent: "190 72% 42%",
    "accent-foreground": "0 0% 100%",
    destructive: "0 84% 60%",
    "destructive-foreground": "0 0% 100%",
    border: "32 40% 82%",
    input: "32 40% 82%",
    ring: "18 88% 56%"
  }
} as const

function getThemeBlock(themeClassName: string) {
  const match = source.match(new RegExp(`\\.${themeClassName}\\s*\\{([^}]*)\\}`, "m"))

  return match?.[1] ?? ""
}

describe("VekUI design tokens", () => {
  it("keeps the shadcn-style color vocabulary compact", () => {
    for (const token of [
      "--color-background",
      "--color-foreground",
      "--color-card",
      "--color-card-foreground",
      "--color-popover",
      "--color-popover-foreground",
      "--color-primary",
      "--color-primary-foreground",
      "--color-secondary",
      "--color-secondary-foreground",
      "--color-muted",
      "--color-muted-foreground",
      "--color-accent",
      "--color-accent-foreground",
      "--color-destructive",
      "--color-destructive-foreground",
      "--color-border",
      "--color-input",
      "--color-ring"
    ]) {
      expect(source).toContain(token)
    }

    expect(source).not.toContain("--color-success")
    expect(source).not.toContain("--color-warning")
    expect(source).not.toContain("--color-info")
  })

  it("adds non-color design tokens for mini-program rhythm and touch quality", () => {
    for (const token of [
      "--radius-sm",
      "--radius-md",
      "--radius-lg",
      "--spacing-vekui-1",
      "--spacing-vekui-2",
      "--spacing-vekui-3",
      "--spacing-vekui-4",
      "--control-sm",
      "--control-md",
      "--control-lg",
      "--duration-fast",
      "--duration-default",
      "--opacity-disabled",
      "--opacity-pressed"
    ]) {
      expect(source).toContain(token)
    }
  })

  it("defines direct theme-scoped color aliases for WXSS theme switching", () => {
    for (const [themeClassName, semanticColors] of Object.entries(themeSemanticColors)) {
      const block = getThemeBlock(themeClassName)

      expect(block, `Missing .${themeClassName} block`).not.toBe("")

      for (const [tokenName, tokenValue] of Object.entries(semanticColors)) {
        expect(block, `${themeClassName} is missing --color-${tokenName}`).toContain(
          `--color-${tokenName}: hsl(${tokenValue})`
        )
      }
    }
  })

  it("overrides native mini-program button disabled colors with semantic tokens", () => {
    expect(source).toContain(".ui-button")
    expect(source).toContain("margin-left: 0")
    expect(source).toContain("margin-right: 0")
    expect(source).toContain('.ui-button[data-loading="true"]')
    expect(source).toContain("opacity: 0.86")
    expect(source).toContain('.ui-button[data-disabled="true"]')
    expect(source).toContain("--opacity-disabled")
    expect(source).toContain("--color-foreground")
    expect(source).toContain("--color-primary-foreground")
  })
})
