import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./navigation-menu.tsx?raw"
import { NavigationMenu, getNavigationMenuState } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("NavigationMenu", () => {
  it("maps item state and exposes compound parts through the public barrel", () => {
    expect(getNavigationMenuState("docs", "docs")).toBe("open")
    expect(getNavigationMenuState("blog", "docs")).toBe("closed")
    expect(NavigationMenu.Root).toBeTypeOf("function")
    expect(NavigationMenu.List).toBeTypeOf("function")
    expect(NavigationMenu.Item).toBeTypeOf("function")
    expect(NavigationMenu.Trigger).toBeTypeOf("function")
    expect(NavigationMenu.Content).toBeTypeOf("function")
  })

  it("uses touch-safe press interactions without browser menu APIs", () => {
    expect(source).toContain("Pressable")
    expect(source).toContain("data-state")
    expect(source).toContain("data-disabled")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("opens one navigation value from trigger and renders tokenized content", () => {
    const onValueChange = vi.fn()
    const tree = create(
      React.createElement(
        NavigationMenu.Root,
        { defaultValue: "", onValueChange },
        React.createElement(
          NavigationMenu.List,
          null,
          React.createElement(
            NavigationMenu.Item,
            { value: "docs" },
            React.createElement(NavigationMenu.Trigger, null, "Docs"),
            React.createElement(NavigationMenu.Content, null, "Documentation")
          )
        )
      )
    )

    const root = findAllByHostType(tree.root, "View")[0]
    const trigger = findAllByHostType(tree.root, "View").find((node) => node.props.children === "Docs")

    expect(root?.props["data-value"]).toBe("")
    act(() => trigger?.props.onClick({ type: "tap" }))
    expect(onValueChange).toHaveBeenCalledWith("docs")

    const classNames = collectClassNames(tree.root)

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
