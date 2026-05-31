import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./swipe-action.tsx?raw"
import { SwipeAction } from "./swipe-action"
import { expectMiniProgramSafeSource, findAllByHostType, findByHostType } from "../test/component-test-utils"

describe("SwipeAction", () => {
  it("reflects closed and open states with tokenized shell", () => {
    const tree = create(<SwipeAction>Row</SwipeAction>)
    const root = findAllByHostType(tree.root, "View")[0]
    const trigger = findAllByHostType(tree.root, "View").find((node) => typeof node.props.onClick === "function")

    expect(root?.props["data-state"]).toBe("closed")
    expect(String(root?.props.className)).toContain("border-border")
    act(() => trigger?.props.onClick())
    expect(findAllByHostType(tree.root, "View")[0]?.props["data-state"]).toBe("open")
  })

  it("renders action buttons and emits selected option", () => {
    const onAction = vi.fn()
    const tree = create(
      <SwipeAction
        open
        onAction={onAction}
        options={[{ label: "Delete", value: "delete", destructive: true }]}
      >
        Row
      </SwipeAction>
    )
    const button = findByHostType(tree.root, "Button")

    act(() => button.props.onClick())
    expect(onAction).toHaveBeenCalledWith("delete")
    expect(source).toContain("data-state={currentOpen ? \"open\" : \"closed\"}")
    expectMiniProgramSafeSource(source)
  })
})
