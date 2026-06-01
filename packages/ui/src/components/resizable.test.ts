import * as React from "react"
import { create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./resizable.tsx?raw"
import { Resizable, getResizableOrientation } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("Resizable", () => {
  it("maps orientation and exposes panel parts", () => {
    expect(getResizableOrientation("vertical")).toBe("vertical")
    expect(getResizableOrientation(undefined)).toBe("horizontal")
    expect(Resizable.PanelGroup).toBeTypeOf("function")
    expect(Resizable.Panel).toBeTypeOf("function")
    expect(Resizable.Handle).toBeTypeOf("function")
    expect(source).not.toContain("ResizeObserver")
    expectMiniProgramSafeSource(source)
  })

  it("renders static panel sizing with tokenized handle", () => {
    const tree = create(
      React.createElement(
        Resizable.PanelGroup,
        null,
        React.createElement(Resizable.Panel, { defaultSize: 35 }, "Left"),
        React.createElement(Resizable.Handle),
        React.createElement(Resizable.Panel, { defaultSize: 65 }, "Right")
      )
    )
    const panels = findAllByHostType(tree.root, "View").filter((node) => node.props["data-size"])
    const classNames = collectClassNames(tree.root)

    expect(panels[0]?.props["data-size"]).toBe(35)
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("border-border"),
        expect.stringContaining("bg-border")
      ])
    )
  })
})
