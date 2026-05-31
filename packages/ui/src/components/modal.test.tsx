import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./modal.tsx?raw"
import { Modal } from "./modal"
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

describe("Modal", () => {
  it("reflects root open state and renders layer-backed content", () => {
    const tree = create(
      <Modal.Root open>
        <Modal.Content>
          <Modal.Title>Title</Modal.Title>
          <Modal.Description>Body</Modal.Description>
        </Modal.Content>
      </Modal.Root>
    )
    const root = findAllByHostType(tree.root, "View")[0]
    const content = tree.root.findByProps({ "data-slot": "layer-content" })

    expect(root?.props["data-state"]).toBe("open")
    expect(content.props["data-side"]).toBe("center")
    expect(String(content.props.className)).toContain("p-4")
    expect(String(findAllByHostType(tree.root, "Text")[0]?.props.className)).toContain("text-foreground")
  })

  it("closes through backdrop and close slot without portal APIs", () => {
    const onOpenChange = vi.fn()
    const tree = create(
      <Modal.Root open onOpenChange={onOpenChange}>
        <Modal.Content>
          <Modal.Action>OK</Modal.Action>
          <Modal.Close>Cancel</Modal.Close>
        </Modal.Content>
      </Modal.Root>
    )
    const backdrop = tree.root.findByProps({ "data-slot": "layer-backdrop" })
    const close = findAllByHostType(tree.root, "View").find((node) => String(node.props.className).includes("bg-secondary"))

    act(() => backdrop.props.onClick())
    expect(onOpenChange).toHaveBeenCalledWith(false)
    act(() => close?.props.onClick({ type: "tap" }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(source).toContain("Layer.Root")
    expectMiniProgramSafeSource(source)
  })
})
