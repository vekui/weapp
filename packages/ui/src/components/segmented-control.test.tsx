import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./segmented-control.tsx?raw"
import { SegmentedControl, getSegmentedControlState } from "./segmented-control"
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

describe("SegmentedControl", () => {
  it("derives active state and renders tokenized root", () => {
    expect(getSegmentedControlState("a", "a")).toBe("active")
    expect(getSegmentedControlState("a", "b")).toBe("inactive")

    const tree = create(
      <SegmentedControl.Root value="a">
        <SegmentedControl.Item value="a">A</SegmentedControl.Item>
        <SegmentedControl.Item value="b">B</SegmentedControl.Item>
      </SegmentedControl.Root>
    )
    const root = findAllByHostType(tree.root, "View")[0]

    expect(root?.props["data-value"]).toBe("a")
    expect(String(root?.props.className)).toContain("bg-muted")
    expect(tree.root.findByProps({ "data-state": "active" })).toBeTruthy()
  })

  it("emits value changes from item clicks", () => {
    const onValueChange = vi.fn()
    const tree = create(
      <SegmentedControl.Root defaultValue="a" onValueChange={onValueChange}>
        <SegmentedControl.Item value="b">B</SegmentedControl.Item>
      </SegmentedControl.Root>
    )
    const item = tree.root.findByProps({ "data-state": "inactive" })

    act(() => item.props.onClick({ type: "tap" }))
    expect(onValueChange).toHaveBeenCalledWith("b")
    expect(source).toContain("useControllableState")
    expectMiniProgramSafeSource(source)
  })
})
