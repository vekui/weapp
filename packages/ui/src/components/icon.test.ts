import { describe, expect, it } from "vitest"

import source from "./icon.tsx?raw"
import { Icon, getLucideIconDataUri } from "./icon"
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

  it("keeps icons local to Taro Image without lucide-react", () => {
    expect(source).toContain("lucideIconPaths")
    expect(source).toContain("@tarojs/components")
    expect(source).not.toContain("children")
    expectMiniProgramSafeSource(source)
  })
})
