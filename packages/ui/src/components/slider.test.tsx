import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./slider.tsx?raw"
import { Slider } from "./slider"
import { expectMiniProgramSafeSource, findAllByHostType, findByHostType } from "../test/component-test-utils"

describe("Slider", () => {
  it("renders label, value state, and semantic shell classes", () => {
    const tree = create(<Slider label="Volume" value={50} />)
    const root = findAllByHostType(tree.root, "View")[0]

    expect(root?.props["data-value"]).toBe(50)
    expect(String(root?.props.className)).toContain("min-h-[88rpx]")
    expect(String(root?.props.className)).toContain("text-foreground")
    expect(findByHostType(tree.root, "Slider").props.value).toBe(50)
  })

  it("composes native onChange with onValueChange", () => {
    const onChange = vi.fn()
    const onValueChange = vi.fn()
    const tree = create(<Slider value={10} onChange={onChange} onValueChange={onValueChange} />)
    const slider = findByHostType(tree.root, "Slider")
    const event = { detail: { value: 42 } }

    act(() => slider.props.onChange(event))
    expect(onChange).toHaveBeenCalledWith(event)
    expect(onValueChange).toHaveBeenCalledWith(42)
    expect(source).not.toContain('activeColor="var(')
    expectMiniProgramSafeSource(source)
  })
})
