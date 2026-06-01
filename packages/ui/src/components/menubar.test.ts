import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./menubar.tsx?raw"
import { Menubar, getMenubarState } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("Menubar", () => {
  it("maps item state and exposes compound parts through the public barrel", () => {
    expect(getMenubarState("file", "file")).toBe("open")
    expect(getMenubarState("edit", "file")).toBe("closed")
    expect(Menubar.Root).toBeTypeOf("function")
    expect(Menubar.Menu).toBeTypeOf("function")
    expect(Menubar.Trigger).toBeTypeOf("function")
    expect(Menubar.Content).toBeTypeOf("function")
    expect(Menubar.Item).toBeTypeOf("function")
  })

  it("uses touch-safe press interactions without browser menu APIs", () => {
    expect(source).toContain("Pressable")
    expect(source).toContain("data-state")
    expect(source).toContain("data-disabled")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("opens one menu value from trigger and renders tokenized content", () => {
    const onValueChange = vi.fn()
    const tree = create(
      React.createElement(
        Menubar.Root,
        { defaultValue: "", onValueChange },
        React.createElement(
          Menubar.Menu,
          { value: "file" },
          React.createElement(Menubar.Trigger, null, "File"),
          React.createElement(
            Menubar.Content,
            null,
            React.createElement(Menubar.Item, { value: "new" }, "New"),
            React.createElement(Menubar.Item, { disabled: true, value: "disabled" }, "Disabled")
          )
        )
      )
    )

    const root = findAllByHostType(tree.root, "View")[0]
    const trigger = findAllByHostType(tree.root, "View").find((node) => node.props.children === "File")

    expect(root?.props["data-value"]).toBe("")
    act(() => trigger?.props.onClick({ type: "tap" }))
    expect(onValueChange).toHaveBeenCalledWith("file")

    const classNames = collectClassNames(tree.root)
    const items = findAllByHostType(tree.root, "View").filter(
      (node) => node.props["data-value"] && node.props.onClick
    )

    const disabledItem = findAllByHostType(tree.root, "View").find(
      (node) => node.props["data-value"] === "disabled"
    )
    const disabledText = findAllByHostType(tree.root, "Text").find((node) => node.props.children === "Disabled")

    expect(disabledItem?.props["data-disabled"]).toBe("")
    expect(String(disabledText?.props.className)).toContain("text-muted-foreground")
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("min-h-[88rpx]"),
        expect.stringContaining("bg-background"),
        expect.stringContaining("border-border"),
        expect.stringContaining("text-foreground")
      ])
    )
  })
})
