import { describe, expect, it } from "vitest"
import * as React from "react"
import { create } from "react-test-renderer"

import source from "./radio-group.tsx?raw"
import { getRadioState, RadioGroup } from "./radio-group"
import { findAllByHostType } from "../test/component-test-utils"

describe("RadioGroup", () => {
  it("marks matching values as checked", () => {
    expect(getRadioState("a", "a")).toBe("checked")
    expect(getRadioState("b", "a")).toBe("unchecked")
  })

  it("uses tokenized root and item classes", () => {
    expect(source).toContain("flex flex-col gap-2")
    expect(source).toContain("border-border")
    expect(source).toContain("data-state={state}")
    expect(RadioGroup.Root).toBeTypeOf("function")
    expect(RadioGroup.Item).toBeTypeOf("function")
  })

  it("mutes disabled option labels and exposes aria-disabled through Pressable", () => {
    const tree = create(
      React.createElement(RadioGroup, {
        options: [{ label: "Disabled", value: "disabled", disabled: true }]
      })
    )
    const item = findAllByHostType(tree.root, "View").find((node) => node.props["data-disabled"] === "true")
    const label = findAllByHostType(tree.root, "Text")[0]

    expect(item?.props["aria-disabled"]).toBe("true")
    expect(label?.props.className).toContain("text-muted-foreground")
  })
})
