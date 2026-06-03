import { describe, expect, it } from "vitest"

import source from "./icon.tsx?raw"
import { Icon, getLucideIconDataUri, resetIconToneColors, setIconToneColor } from "./icon"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("Icon", () => {
  it("builds data-uri icons with semantic size and state attributes", () => {
    const uri = getLucideIconDataUri("plus", "primary", true)
    const icon = Icon({ name: "plus", size: "lg", tone: "primary", filled: true })

    expect(uri).toContain("data:image/svg+xml")
    expect(decodeURIComponent(uri)).toContain('fill="hsl(221 83% 53%)"')
    expect(getProps(icon)["data-icon"]).toBe("plus")
    expect(getProps(icon)["data-size"]).toBe("lg")
    expect(getProps(icon).mode).toBe("aspectFit")
    expect(getClassName(icon)).toContain("h-[64rpx]")
  })

  it("allows explicit token colors for themed demo surfaces", () => {
    const uri = getLucideIconDataUri("grid-2x2", "primary", false, "#f2672c")
    const icon = Icon({ color: "#f2672c", name: "grid-2x2", tone: "primary" })

    expect(decodeURIComponent(uri)).toContain('stroke="#f2672c"')
    expect(getProps(icon).src).toContain(encodeURIComponent('stroke="#f2672c"'))
  })

  it("allows primary icon tone to be synchronized by the active theme", () => {
    setIconToneColor("primary", "#f2672c")

    try {
      const icon = Icon({ name: "star", tone: "primary" })

      expect(decodeURIComponent(getProps(icon).src as string)).toContain('stroke="#f2672c"')
    } finally {
      resetIconToneColors()
    }
  })

  it("keeps icons local to Taro Image without lucide-react", () => {
    expect(source).toContain("lucideIconPaths")
    expect(source).toContain("@tarojs/components")
    expect(source).not.toContain("children")
    expectMiniProgramSafeSource(source)
  })
})
