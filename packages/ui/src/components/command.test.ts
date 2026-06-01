import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./command.tsx?raw"
import { Command, getCommandItemState } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("Command", () => {
  it("maps item state and exposes compound parts through the public barrel", () => {
    expect(getCommandItemState(true)).toBe("selected")
    expect(getCommandItemState(false)).toBe("default")
    expect(Command.Root).toBeTypeOf("function")
    expect(Command.Input).toBeTypeOf("function")
    expect(Command.List).toBeTypeOf("function")
    expect(Command.Item).toBeTypeOf("function")
    expect(Command.Empty).toBeTypeOf("function")
  })

  it("uses Taro-safe input and press interactions", () => {
    expect(source).toContain("InputBase")
    expect(source).toContain("Pressable")
    expect(source).toContain("data-state")
    expect(source).toContain("data-disabled")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("renders tokenized command surface and item states", () => {
    const onSelect = vi.fn()
    const tree = create(
      React.createElement(
        Command.Root,
        null,
        React.createElement(Command.Input, { placeholder: "Search" }),
        React.createElement(
          Command.List,
          null,
          React.createElement(Command.Item, { onSelect, selected: true, value: "copy" }, "Copy"),
          React.createElement(Command.Item, { disabled: true, value: "disabled" }, "Disabled")
        )
      )
    )

    const classNames = collectClassNames(tree.root)
    const items = findAllByHostType(tree.root, "View").filter((node) => node.props["data-value"])
    const disabledText = findAllByHostType(tree.root, "Text").find((node) => node.props.children === "Disabled")

    expect(items[0]?.props["data-state"]).toBe("selected")
    expect(items[1]?.props["data-disabled"]).toBe("")
    expect(String(disabledText?.props.className)).toContain("text-muted-foreground")
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("bg-background"),
        expect.stringContaining("border-border"),
        expect.stringContaining("text-foreground"),
        expect.stringContaining("min-h-[88rpx]")
      ])
    )

    act(() => items[0]?.props.onClick({ type: "tap" }))
    expect(onSelect).toHaveBeenCalledWith("copy")
  })
})
