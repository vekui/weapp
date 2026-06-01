import * as React from "react"
import { create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./direction.tsx?raw"
import { Direction, getDirectionState } from "."
import { expectMiniProgramSafeSource } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("Direction", () => {
  it("maps direction state and exposes root/provider aliases", () => {
    expect(getDirectionState("rtl")).toBe("rtl")
    expect(getDirectionState(undefined)).toBe("ltr")
    expect(Direction.Root).toBeTypeOf("function")
    expect(Direction.Provider).toBeTypeOf("function")
    expectMiniProgramSafeSource(source)
  })

  it("renders data-dir and safe flex direction classes", () => {
    const tree = create(React.createElement(Direction.Root, { dir: "rtl" }, "RTL"))
    const root = tree.root.findAll((node) => node.props["data-dir"])[0]
    const classNames = collectClassNames(tree.root)

    expect(root?.props["data-dir"]).toBe("rtl")
    expect(classNames).toEqual(expect.arrayContaining([expect.stringContaining("flex-row-reverse")]))
  })
})
