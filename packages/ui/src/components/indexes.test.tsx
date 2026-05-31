import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./indexes.tsx?raw"
import { Indexes } from "./indexes"
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

describe("Indexes", () => {
  it("renders section count, tokenized shell, and selectable items", () => {
    const onSelect = vi.fn()
    const tree = create(
      <Indexes
        onSelect={onSelect}
        sections={[{ key: "A", title: "A", items: [{ label: "Ada", value: "ada" }] }]}
      />
    )
    const root = findAllByHostType(tree.root, "View")[0]
    const item = tree.root.findByProps({ "data-state": "item" })

    expect(root?.props["data-count"]).toBe(1)
    expect(root?.props["data-state"]).toBe("default")
    expect(String(root?.props.className)).toContain("bg-card")
    expect(tree.root.findByProps({ "data-index-key": "A" })).toBeTruthy()
    act(() => item.props.onClick())
    expect(onSelect).toHaveBeenCalledWith("ada")
  })

  it("keeps source mini-program safe", () => {
    expect(source).toContain("gap-1")
    expectMiniProgramSafeSource(source)
  })
})
