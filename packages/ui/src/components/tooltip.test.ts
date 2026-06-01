import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./tooltip.tsx?raw"
import { Tooltip, getTooltipState } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

function hasRenderedTooltipContent(root: ReactTestInstance) {
  return findAllByHostType(root, "View").some((node) =>
    String(node.props.className ?? "").includes("bg-background")
  )
}

describe("Tooltip", () => {
  it("maps open state and exposes compound parts through the public barrel", () => {
    expect(getTooltipState(true)).toBe("open")
    expect(getTooltipState(false)).toBe("closed")
    expect(Tooltip.Root).toBeTypeOf("function")
    expect(Tooltip.Trigger).toBeTypeOf("function")
    expect(Tooltip.Content).toBeTypeOf("function")
  })

  it("uses Taro-safe press interactions without browser APIs", () => {
    expect(source).toContain("Pressable")
    expect(source).toContain("data-state")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("renders closed by default and toggles uncontrolled content from the trigger", () => {
    const tree = create(
      React.createElement(
        Tooltip.Root,
        null,
        React.createElement(Tooltip.Trigger, null, "Trigger"),
        React.createElement(Tooltip.Content, null, "Helpful")
      )
    )

    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("closed")
    expect(hasRenderedTooltipContent(tree.root)).toBe(false)

    const trigger = findAllByHostType(tree.root, "View").find((node) => node.props.children === "Trigger")
    act(() => trigger?.props.onClick({ type: "tap" }))

    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("open")
    expect(hasRenderedTooltipContent(tree.root)).toBe(true)
  })

  it("honors controlled open state while still announcing trigger intent", () => {
    const onOpenChange = vi.fn()
    const tree = create(
      React.createElement(
        Tooltip.Root,
        { open: false, onOpenChange },
        React.createElement(Tooltip.Trigger, null, "Trigger"),
        React.createElement(Tooltip.Content, null, "Helpful")
      )
    )
    const trigger = findAllByHostType(tree.root, "View").find((node) => node.props.children === "Trigger")

    act(() => trigger?.props.onClick({ type: "tap" }))

    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("closed")
    expect(hasRenderedTooltipContent(tree.root)).toBe(false)
  })

  it("renders semantic token classes and touch target sizing when open", () => {
    const tree = create(
      React.createElement(
        Tooltip.Root,
        { defaultOpen: true },
        React.createElement(Tooltip.Trigger, null, "Trigger"),
        React.createElement(Tooltip.Content, null, "Helpful")
      )
    )
    const classNames = collectClassNames(tree.root)

    expect(source).toContain("min-h-[88rpx]")
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("bg-background"),
        expect.stringContaining("border-border"),
        expect.stringContaining("text-foreground")
      ])
    )
  })
})
