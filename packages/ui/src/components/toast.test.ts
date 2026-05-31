import { describe, expect, it } from "vitest"

import source from "./toast.tsx?raw"
import { Toast, ToastDescription, ToastTitle, ToastViewport } from "./toast"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("Toast", () => {
  it("renders simple open toast with variant state and tone", () => {
    const element = Toast({ open: true, variant: "success", children: "Saved" })

    expect(getProps(element)["data-state"]).toBe("success")
    expect(getProps(element)["data-tone"]).toBe("success")
    expect(getClassName(element)).toContain("bg-primary")
    expect(getClassName(element)).toContain("fixed")
  })

  it("renders structured toast slots with semantic tokens", () => {
    const element = Toast({ title: "Saved", description: "Done", tone: "destructive" })

    expect(getProps(element)["data-state"]).toBe("open")
    expect(getProps(element)["data-tone"]).toBe("destructive")
    expect(getClassName(element)).toContain("border-destructive")
    expect(String(ToastTitle({}).props.className)).toContain("font-medium")
    expect(String(ToastDescription({}).props.className)).toContain("opacity-80")
    expect(String(ToastViewport({}).props.className)).toContain("z-[950]")
    expectMiniProgramSafeSource(source)
  })
})
