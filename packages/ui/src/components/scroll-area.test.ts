import { describe, expect, it } from "vitest"

import source from "./scroll-area.tsx?raw"
import { ScrollArea } from "./scroll-area"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("ScrollArea", () => {
  it("defaults to vertical Taro scroll with semantic token classes", () => {
    const element = ScrollArea({})

    expect(getProps(element).scrollY).toBe(true)
    expect(getClassName(element)).toContain("overflow-hidden")
    expect(getClassName(element)).toContain("bg-background")
    expect(getClassName(element)).toContain("text-foreground")
  })

  it("allows API override and avoids browser APIs", () => {
    expect(getProps(ScrollArea({ scrollY: false })).scrollY).toBe(false)
    expect(source).toContain("@tarojs/components")
    expectMiniProgramSafeSource(source)
  })
})
