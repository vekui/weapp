import { describe, expect, it } from "vitest"
import type { ReactElement } from "react"

import source from "./sheet.tsx?raw"
import { getSheetSide, Sheet } from "./sheet"

function getClassName(element: ReactElement) {
  return String(element.props.className ?? "")
}

describe("Sheet", () => {
  it("defaults to bottom placement and uses Layer", () => {
    expect(getSheetSide(undefined)).toBe("bottom")
    expect(getSheetSide("right")).toBe("right")
    expect(source).toContain("Layer.Content")
    expect(source).toContain("side={side}")
    expect(Sheet.Content).toBeTypeOf("function")
  })

  it("stacks title and description as block text in mini-program text nodes", () => {
    expect(getClassName(Sheet.Title({ children: "Title" }) as ReactElement)).toContain("block")
    expect(getClassName(Sheet.Description({ children: "Description" }) as ReactElement)).toContain("block")
  })

  it("centers the close touch target with flex layout", () => {
    expect(source).toContain("flex min-h-[88rpx] flex-row items-center justify-center")
  })
})
