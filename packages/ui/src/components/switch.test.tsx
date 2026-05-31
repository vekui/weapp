import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./switch.tsx?raw"
import { Switch } from "./switch"
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

describe("Switch", () => {
  it("reflects checked state through data-state and semantic classes", () => {
    const tree = create(<Switch defaultChecked />)
    const views = findAllByHostType(tree.root, "View")

    expect(views[0]?.props["data-state"]).toBe("checked")
    expect(String(views[0]?.props.className)).toContain("bg-primary")
    expect(String(views[1]?.props.className)).toContain("ml-[40rpx]")
  })

  it("composes click handlers and uses margin instead of translate utilities", () => {
    const onClick = vi.fn()
    const onCheckedChange = vi.fn()
    const event = { type: "tap" }
    const tree = create(<Switch onClick={onClick} onCheckedChange={onCheckedChange} />)
    const root = findAllByHostType(tree.root, "View")[0]

    act(() => root?.props.onClick(event))
    expect(onClick).toHaveBeenCalledWith(event)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(source).toContain("transition-[margin]")
    expectMiniProgramSafeSource(source)
  })
})
