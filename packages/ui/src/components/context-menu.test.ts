import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./context-menu.tsx?raw"
import { ContextMenu, getContextMenuState } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

function hasRenderedMenuContent(root: ReactTestInstance) {
  return findAllByHostType(root, "View").some((node) =>
    String(node.props.className ?? "").includes("bg-background")
  )
}

describe("ContextMenu", () => {
  it("maps open state and exposes compound parts through the public barrel", () => {
    expect(getContextMenuState(true)).toBe("open")
    expect(getContextMenuState(false)).toBe("closed")
    expect(ContextMenu.Root).toBeTypeOf("function")
    expect(ContextMenu.Trigger).toBeTypeOf("function")
    expect(ContextMenu.Content).toBeTypeOf("function")
    expect(ContextMenu.Item).toBeTypeOf("function")
  })

  it("uses touch-safe press interactions instead of browser context menu APIs", () => {
    expect(source).toContain("Pressable")
    expect(source).toContain("data-state")
    expect(source).toContain("data-disabled")
    expect(source).toContain("data-destructive")
    expect(source).not.toContain("onContextMenu")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("toggles uncontrolled content from the trigger", () => {
    const tree = create(
      React.createElement(
        ContextMenu.Root,
        null,
        React.createElement(ContextMenu.Trigger, null, "Open"),
        React.createElement(
          ContextMenu.Content,
          null,
          React.createElement(ContextMenu.Item, { value: "copy" }, "Copy")
        )
      )
    )

    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("closed")
    expect(hasRenderedMenuContent(tree.root)).toBe(false)

    const trigger = findAllByHostType(tree.root, "View").find((node) => node.props.children === "Open")
    act(() => trigger?.props.onClick({ type: "tap" }))

    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("open")
    expect(hasRenderedMenuContent(tree.root)).toBe(true)
  })

  it("selects enabled items, closes content, and exposes item state", () => {
    const onSelect = vi.fn()
    const tree = create(
      React.createElement(
        ContextMenu.Root,
        { defaultOpen: true },
        React.createElement(ContextMenu.Trigger, null, "Open"),
        React.createElement(
          ContextMenu.Content,
          null,
          React.createElement(ContextMenu.Item, { onSelect, value: "copy" }, "Copy"),
          React.createElement(ContextMenu.Item, { destructive: true, value: "delete" }, "Delete"),
          React.createElement(ContextMenu.Item, { disabled: true, value: "disabled" }, "Disabled")
        )
      )
    )

    const classNames = collectClassNames(tree.root)
    const items = findAllByHostType(tree.root, "View").filter((node) => node.props["data-value"])
    const disabledText = findAllByHostType(tree.root, "Text").find((node) => node.props.children === "Disabled")

    expect(items[1]?.props["data-destructive"]).toBe("")
    expect(items[2]?.props["data-disabled"]).toBe("true")
    expect(items[2]?.props["aria-disabled"]).toBe("true")
    expect(String(disabledText?.props.className)).toContain("text-muted-foreground")
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("min-h-[88rpx]"),
        expect.stringContaining("bg-background"),
        expect.stringContaining("border-border"),
        expect.stringContaining("text-foreground")
      ])
    )

    act(() => items[0]?.props.onClick({ type: "tap" }))

    expect(onSelect).toHaveBeenCalledWith("copy")
    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("closed")
    expect(hasRenderedMenuContent(tree.root)).toBe(false)
  })
})
