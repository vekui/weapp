import * as React from "react"
import { describe, expect, it } from "vitest"

import source from "./action-sheet.tsx?raw"
import { ActionSheet, getActionSheetState } from "./action-sheet"

function collectClassNames(node: React.ReactNode): string[] {
  if (Array.isArray(node)) return node.flatMap(collectClassNames)
  if (!React.isValidElement(node)) return []

  const className = typeof node.props.className === "string" ? [node.props.className] : []
  return [...className, ...collectClassNames(node.props.children)]
}

describe("ActionSheet", () => {
  it("uses bottom layer and action state attributes", () => {
    expect(getActionSheetState(true)).toBe("open")
    expect(source).toContain('side="bottom"')
    expect(source).toContain("data-destructive")
    expect(source).toContain("data-disabled")
    expect(ActionSheet).toBeTypeOf("function")
  })

  it("centers action and cancel rows with flex touch targets", () => {
    const classNames = collectClassNames(
      ActionSheet({
        open: true,
        actions: [{ label: "Primary action", value: "primary" }]
      })
    )

    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("flex min-h-[88rpx] flex-row items-center justify-center")
      ])
    )
    expect(classNames.filter((className) => className.includes("flex min-h-[88rpx]")).length).toBe(2)
  })
})
