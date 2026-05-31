import { describe, expect, it } from "vitest"

import source from "./safe-area.tsx?raw"
import { SafeArea, getSafeAreaClass } from "./safe-area"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("SafeArea", () => {
  it("maps edge API to env inset classes and data-edge", () => {
    expect(getSafeAreaClass("top")).toBe("pt-[env(safe-area-inset-top)]")
    expect(getSafeAreaClass("bottom")).toBe("pb-[env(safe-area-inset-bottom)]")
    expect(getSafeAreaClass("both")).toContain("pb-[env(safe-area-inset-bottom)]")
    expect(getProps(SafeArea({ edge: "both" }))["data-edge"]).toBe("both")
    expect(getClassName(SafeArea({ edge: "both" }))).toContain("pt-[env(safe-area-inset-top)]")
  })

  it("keeps source mini-program safe", () => {
    expectMiniProgramSafeSource(source)
  })
})
