import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./hover-card.tsx?raw"
import { HoverCard, getHoverCardState } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

function hasRenderedHoverCardContent(root: ReactTestInstance) {
  return findAllByHostType(root, "View").some((node) =>
    String(node.props.className ?? "").includes("bg-background")
  )
}

describe("HoverCard", () => {
  it("maps open state and exposes compound parts through the public barrel", () => {
    expect(getHoverCardState(true)).toBe("open")
    expect(getHoverCardState(false)).toBe("closed")
    expect(HoverCard.Root).toBeTypeOf("function")
    expect(HoverCard.Trigger).toBeTypeOf("function")
    expect(HoverCard.Content).toBeTypeOf("function")
    expect(HoverCard.Title).toBeTypeOf("function")
    expect(HoverCard.Description).toBeTypeOf("function")
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
        HoverCard.Root,
        null,
        React.createElement(HoverCard.Trigger, null, "Profile"),
        React.createElement(
          HoverCard.Content,
          null,
          React.createElement(HoverCard.Title, null, "VekUI"),
          React.createElement(HoverCard.Description, null, "Details")
        )
      )
    )

    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("closed")
    expect(hasRenderedHoverCardContent(tree.root)).toBe(false)

    const trigger = findAllByHostType(tree.root, "View").find((node) => node.props.children === "Profile")
    act(() => trigger?.props.onClick({ type: "tap" }))

    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("open")
    expect(hasRenderedHoverCardContent(tree.root)).toBe(true)
  })

  it("honors controlled open state while still announcing trigger intent", () => {
    const onOpenChange = vi.fn()
    const tree = create(
      React.createElement(
        HoverCard.Root,
        { open: false, onOpenChange },
        React.createElement(HoverCard.Trigger, null, "Profile"),
        React.createElement(HoverCard.Content, null, "Details")
      )
    )
    const trigger = findAllByHostType(tree.root, "View").find((node) => node.props.children === "Profile")

    act(() => trigger?.props.onClick({ type: "tap" }))

    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("closed")
    expect(hasRenderedHoverCardContent(tree.root)).toBe(false)
  })

  it("renders semantic token classes and touch target sizing when open", () => {
    const tree = create(
      React.createElement(
        HoverCard.Root,
        { defaultOpen: true },
        React.createElement(HoverCard.Trigger, null, "Profile"),
        React.createElement(
          HoverCard.Content,
          null,
          React.createElement(HoverCard.Title, null, "VekUI"),
          React.createElement(HoverCard.Description, null, "Details")
        )
      )
    )
    const classNames = collectClassNames(tree.root)

    expect(source).toContain("min-h-[88rpx]")
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("bg-background"),
        expect.stringContaining("border-border"),
        expect.stringContaining("text-foreground"),
        expect.stringContaining("text-muted-foreground")
      ])
    )
  })
})
