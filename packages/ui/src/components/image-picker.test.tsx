import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./image-picker.tsx?raw"
import { ImagePicker } from "./image-picker"
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

describe("ImagePicker", () => {
  it("renders add state and emits add action while under max count", () => {
    const onAdd = vi.fn()
    const tree = create(<ImagePicker files={[]} maxCount={1} onAdd={onAdd} />)
    const root = findAllByHostType(tree.root, "View")[0]
    const add = tree.root.findByProps({ "data-state": "add" })

    expect(root?.props["data-count"]).toBe(0)
    expect(root?.props["data-state"]).toBe("default")
    expect(String(root?.props.className)).toContain("grid-cols-3")
    act(() => add.props.onClick())
    expect(onAdd).toHaveBeenCalled()
  })

  it("renders full file state and emits remove action", () => {
    const file = { id: "a", url: "a.png" }
    const onRemove = vi.fn()
    const tree = create(<ImagePicker files={[file]} maxCount={1} onRemove={onRemove} />)
    const root = findAllByHostType(tree.root, "View")[0]
    const item = tree.root.findByProps({ "data-state": "file" })

    expect(root?.props["data-state"]).toBe("full")
    expect(findAllByHostType(tree.root, "Image")[0]?.props.mode).toBe("aspectFill")
    act(() => item.props.onClick())
    expect(onRemove).toHaveBeenCalledWith(file)
    expect(source).toContain("@tarojs/components")
    expectMiniProgramSafeSource(source)
  })
})
