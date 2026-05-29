import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import { Rate } from "./rate"

function allByType(root: ReactTestInstance, type: string) {
  return root.findAll((candidate) => candidate.type === type)
}

describe("Rate", () => {
  it("supports uncontrolled value changes from a default value", () => {
    const onValueChange = vi.fn()
    const tree = create(<Rate defaultValue={2} onValueChange={onValueChange} />)

    expect(allByType(tree.root, "View")[0]?.props["data-value"]).toBe(2)

    act(() => allByType(tree.root, "View")[4]?.props.onClick())

    expect(onValueChange).toHaveBeenCalledWith(4)
    expect(allByType(tree.root, "View")[0]?.props["data-value"]).toBe(4)
  })
})
