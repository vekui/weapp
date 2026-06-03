import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./sidebar.tsx?raw"
import { Sidebar } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("Sidebar", () => {
  it("exposes compound parts and stays mini-program safe", () => {
    expect(Sidebar.Root).toBeTypeOf("function")
    expect(Sidebar.Trigger).toBeTypeOf("function")
    expect(Sidebar.Content).toBeTypeOf("function")
    expect(Sidebar.Header).toBeTypeOf("function")
    expect(Sidebar.Footer).toBeTypeOf("function")
    expect(Sidebar.Item).toBeTypeOf("function")
    expect(Sidebar.Close).toBeTypeOf("function")
    expect(source).toContain("Layer.Content")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("renders open state, side data and item states with token classes", () => {
    const tree = create(
      React.createElement(
        Sidebar.Root,
        { open: true },
        React.createElement(Sidebar.Content, { side: "right" },
          React.createElement(Sidebar.Header, null, "Menu"),
          React.createElement(Sidebar.Item, { active: true }, "Dashboard"),
          React.createElement(Sidebar.Item, { disabled: true }, "Disabled"),
          React.createElement(Sidebar.Footer, null, "Footer")
        )
      )
    )
    const classNames = collectClassNames(tree.root)
    const content = tree.root.findByProps({ "data-side": "right" })
    const items = findAllByHostType(tree.root, "View").filter((node) => node.props["data-active"])

    expect(content.props["data-state"]).toBe("open")
    expect(items[0]?.props["data-active"]).toBe("true")
    expect(items[1]?.props["data-disabled"]).toBe("true")
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("bg-card"),
        expect.stringContaining("border-border"),
        expect.stringContaining("text-muted-foreground")
      ])
    )
  })

  it("toggles uncontrolled state from trigger and close controls", () => {
    const tree = create(
      React.createElement(
        Sidebar.Root,
        null,
        React.createElement(Sidebar.Trigger, null, "Open"),
        React.createElement(Sidebar.Content, null,
          React.createElement(Sidebar.Close, null, "Close")
        )
      )
    )

    expect(tree.root.findByProps({ "data-state": "closed" })).toBeTruthy()
    act(() => findAllByHostType(tree.root, "View").find((node) => typeof node.props.onClick === "function")?.props.onClick({}))
    expect(tree.root.findByProps({ "data-state": "open" })).toBeTruthy()
    act(() => findAllByHostType(tree.root, "View").filter((node) => typeof node.props.onClick === "function").at(-1)?.props.onClick({}))
    expect(tree.root.findByProps({ "data-state": "closed" })).toBeTruthy()
  })
})
