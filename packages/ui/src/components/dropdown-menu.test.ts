import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./dropdown-menu.tsx?raw"
import { DropdownMenu, getDropdownMenuState } from "."
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

describe("DropdownMenu", () => {
  it("maps open state and exposes compound parts through the public barrel", () => {
    expect(getDropdownMenuState(true)).toBe("open")
    expect(getDropdownMenuState(false)).toBe("closed")
    expect(DropdownMenu.Root).toBeTypeOf("function")
    expect(DropdownMenu.Trigger).toBeTypeOf("function")
    expect(DropdownMenu.Content).toBeTypeOf("function")
    expect(DropdownMenu.Item).toBeTypeOf("function")
  })

  it("uses Taro-safe press interactions and state attributes", () => {
    expect(source).toContain("Pressable")
    expect(source).toContain("data-state")
    expect(source).toContain("data-disabled")
    expect(source).toContain("data-destructive")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("toggles uncontrolled content from the trigger", () => {
    const tree = create(
      React.createElement(
        DropdownMenu.Root,
        null,
        React.createElement(DropdownMenu.Trigger, null, "Open"),
        React.createElement(
          DropdownMenu.Content,
          null,
          React.createElement(DropdownMenu.Item, { value: "copy" }, "Copy")
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
        DropdownMenu.Root,
        { defaultOpen: true },
        React.createElement(DropdownMenu.Trigger, null, "Open"),
        React.createElement(
          DropdownMenu.Content,
          null,
          React.createElement(DropdownMenu.Item, { onSelect, value: "copy" }, "Copy"),
          React.createElement(DropdownMenu.Item, { destructive: true, value: "delete" }, "Delete"),
          React.createElement(DropdownMenu.Item, { disabled: true, value: "disabled" }, "Disabled")
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
