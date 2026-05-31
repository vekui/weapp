import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./float-layout.tsx?raw"
import { FloatLayout, FloatLayoutClose, FloatLayoutTitle } from "./float-layout"
import { expectMiniProgramSafeSource } from "../test/component-test-utils"

describe("FloatLayout", () => {
  it("renders bottom layer state and closes through the backdrop", () => {
    const onOpenChange = vi.fn()
    const tree = create(
      <FloatLayout open onOpenChange={onOpenChange}>
        Content
      </FloatLayout>
    )
    const content = tree.root.findByProps({ "data-slot": "layer-content" })
    const backdrop = tree.root.findByProps({ "data-slot": "layer-backdrop" })

    expect(content.props["data-state"]).toBe("open")
    expect(content.props["data-side"]).toBe("bottom")
    expect(String(content.props.className)).toContain("p-4")
    act(() => backdrop.props.onClick())
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it("exposes tokenized title and close slots without portal APIs", () => {
    const closedTree = create(<FloatLayout open={false}>Closed</FloatLayout>)
    const close = FloatLayoutClose({})

    expect(closedTree.toJSON()).toBeNull()
    expect(String(FloatLayoutTitle({}).props.className)).toContain("text-foreground")
    expect(String(close.props.className)).toContain("bg-secondary")
    expect(source).toContain("Layer.Root")
    expectMiniProgramSafeSource(source)
  })
})
