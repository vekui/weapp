import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./combobox.tsx?raw"
import { Combobox, getComboboxState } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

const options = [
  { label: "Compact", value: "compact" },
  { label: "Comfortable", value: "comfortable" },
  { label: "Disabled", value: "disabled", disabled: true }
]

describe("Combobox", () => {
  it("maps selection state and exposes a public component", () => {
    expect(getComboboxState("compact")).toBe("selected")
    expect(getComboboxState("")).toBe("placeholder")
    expect(Combobox).toBeTypeOf("function")
  })

  it("uses Taro-safe press interactions without browser APIs", () => {
    expect(source).toContain("Pressable")
    expect(source).toContain("data-state")
    expect(source).toContain("data-invalid")
    expect(source).toContain("data-disabled")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("opens options, selects a value, and renders token classes", () => {
    const onValueChange = vi.fn()
    const tree = create(
      <Combobox options={options} placeholder="Choose" onValueChange={onValueChange} />
    )

    const trigger = findAllByHostType(tree.root, "View").find((node) => node.props["data-role"] === "combobox-trigger")
    expect(trigger?.props["data-state"]).toBe("placeholder")

    act(() => trigger?.props.onClick({ type: "tap" }))

    const optionNodes = findAllByHostType(tree.root, "View").filter((node) => node.props["data-value"])
    act(() => optionNodes[1]?.props.onClick({ type: "tap" }))

    expect(onValueChange).toHaveBeenCalledWith("comfortable")

    const classNames = collectClassNames(tree.root)
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("bg-background"),
        expect.stringContaining("text-foreground"),
        expect.stringContaining("min-h-[88rpx]")
      ])
    )
    expect(source).toContain("border-border")
  })

  it("keeps disabled options muted and non-selectable", () => {
    const onValueChange = vi.fn()
    const tree = create(
      <Combobox options={options} placeholder="Choose" defaultOpen onValueChange={onValueChange} />
    )

    const optionNodes = findAllByHostType(tree.root, "View").filter((node) => node.props["data-value"])
    const disabledText = findAllByHostType(tree.root, "Text").find((node) => node.props.children === "Disabled")

    expect(optionNodes[2]?.props["data-disabled"]).toBe("true")
    expect(optionNodes[2]?.props["aria-disabled"]).toBe("true")
    expect(String(disabledText?.props.className)).toContain("text-muted-foreground")
    expect(optionNodes[2]?.props.onClick).toBeUndefined()

    expect(onValueChange).not.toHaveBeenCalled()
  })
})
