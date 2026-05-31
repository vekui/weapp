import { describe, expect, it } from "vitest"

import source from "./load-more.tsx?raw"
import { LoadMore, getLoadMoreText } from "./load-more"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("LoadMore", () => {
  it("maps status API to data-state, copy, and token classes", () => {
    const element = LoadMore({ status: "error" })

    expect(getLoadMoreText("done")).toBe("No more")
    expect(getLoadMoreText("error")).toBe("Try again")
    expect(getProps(element)["data-state"]).toBe("error")
    expect(getClassName(element)).toContain("text-muted-foreground")
  })

  it("renders loading through Spinner without browser APIs", () => {
    const element = LoadMore({ status: "loading" })

    expect(getProps(element).children).toBeTruthy()
    expect(source).toContain("Spinner")
    expectMiniProgramSafeSource(source)
  })
})
