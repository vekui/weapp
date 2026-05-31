import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./input-number.tsx?raw"
import { InputNumber, clampInputNumber } from "./input-number"
import { expectMiniProgramSafeSource, findAllByHostType, findByHostType } from "../test/component-test-utils"

describe("InputNumber", () => {
  it("clamps values and exposes data-value state", () => {
    expect(clampInputNumber(12, { min: 0, max: 10 })).toBe(10)
    expect(clampInputNumber(-1, { min: 0, max: 10 })).toBe(0)

    const tree = create(<InputNumber value={12} min={0} max={10} />)
    const root = findAllByHostType(tree.root, "View")[0]

    expect(root?.props["data-value"]).toBe(10)
    expect(String(root?.props.className)).toContain("border-input")
  })

  it("emits stepped and typed value changes", () => {
    const onValueChange = vi.fn()
    const tree = create(<InputNumber value={4} min={0} max={5} step={2} onValueChange={onValueChange} />)
    const buttons = findAllByHostType(tree.root, "View").filter((node) => typeof node.props.onClick === "function")
    const input = findByHostType(tree.root, "Input")

    act(() => buttons[1]?.props.onClick())
    expect(onValueChange).toHaveBeenCalledWith(5)
    act(() => input.props.onInput({ detail: { value: "2" } }))
    expect(onValueChange).toHaveBeenCalledWith(2)
    expect(source).toContain("Icon")
    expectMiniProgramSafeSource(source)
  })
})
