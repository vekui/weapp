import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./range.tsx?raw"
import { Range, normalizeRange } from "./range"
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

describe("Range", () => {
  it("normalizes range order and exposes data-value state", () => {
    expect(normalizeRange([90, 10], 0, 100)).toEqual([10, 90])
    expect(normalizeRange([-1, 120], 0, 100)).toEqual([0, 100])

    const tree = create(<Range value={[80, 20]} />)
    const root = findAllByHostType(tree.root, "View")[0]

    expect(root?.props["data-state"]).toBe("default")
    expect(root?.props["data-value"]).toBe("20-80")
    expect(String(root?.props.className)).toContain("text-foreground")
  })

  it("emits changes from both native sliders", () => {
    const onValueChange = vi.fn()
    const tree = create(<Range value={[20, 80]} onValueChange={onValueChange} />)
    const sliders = findAllByHostType(tree.root, "Slider")

    act(() => sliders[0]?.props.onChange({ detail: { value: 30 } }))
    expect(onValueChange).toHaveBeenCalledWith([30, 80])
    act(() => sliders[1]?.props.onChange({ detail: { value: 10 } }))
    expect(onValueChange).toHaveBeenCalledWith([10, 20])
    expectMiniProgramSafeSource(source)
  })
})
