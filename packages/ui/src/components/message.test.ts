import { describe, expect, it } from "vitest"

import source from "./message.tsx?raw"
import { Message } from "./message"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("Message", () => {
  it("maps variants to data-state and semantic token classes", () => {
    const element = Message({ variant: "success", title: "Saved", description: "Done" })

    expect(getProps(element)["data-state"]).toBe("success")
    expect(getClassName(element)).toContain("border-primary")
    expect(getClassName(element)).toContain("bg-secondary")
    expect(String(getProps(element).children)).toContain("[object Object]")
  })

  it("keeps feedback source mini-program safe", () => {
    expect(getClassName(Message({ variant: "error" }))).toContain("text-destructive")
    expect(source).toContain("data-state={variant}")
    expectMiniProgramSafeSource(source)
  })
})
