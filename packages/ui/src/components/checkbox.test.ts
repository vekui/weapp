import { describe, expect, it } from "vitest"
import * as React from "react"
import { create } from "react-test-renderer"

import source from "./checkbox.tsx?raw"
import { Checkbox } from "./checkbox"
import { findAllByHostType } from "../test/component-test-utils"

const forbiddenPatterns = ["win" + "dow", "docu" + "ment", "React" + "DOM", "hover:"]

describe("Checkbox", () => {
  it("keeps checked state tokenized and icon based", () => {
    expect(Checkbox).toBeTypeOf("function")

    expect(source).toContain("data-state")
    expect(source).toContain("border-primary")
    expect(source).toContain("bg-primary")
    expect(source).toContain('name="check"')
    expect(source).not.toContain("✓")

    for (const pattern of forbiddenPatterns) {
      expect(source).not.toContain(pattern)
    }
  })

  it("mutes disabled label text while preserving checked state hooks", () => {
    const tree = create(React.createElement(Checkbox, { checked: true, disabled: true, label: "Accept" }))
    const root = findAllByHostType(tree.root, "View")[0]
    const label = findAllByHostType(tree.root, "Text").find((node) => node.props.children === "Accept")

    expect(root?.props["data-disabled"]).toBe("true")
    expect(root?.props["aria-disabled"]).toBe("true")
    expect(label?.props.className).toContain("text-muted-foreground")
  })
})
