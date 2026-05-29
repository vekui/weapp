import { describe, expect, it } from "vitest"
import type { ReactElement } from "react"

import source from "./dialog.tsx?raw"
import { Dialog, getDialogState } from "./dialog"

function getClassName(element: ReactElement) {
  return String(element.props.className ?? "")
}

describe("Dialog", () => {
  it("exposes open state and title-required structure", () => {
    expect(getDialogState(true)).toBe("open")
    expect(getDialogState(false)).toBe("closed")
    expect(source).toContain("Layer.Root")
    expect(source).toContain("DialogTitle")
    expect(source).not.toContain("createPortal")
    expect(Dialog.Root).toBeTypeOf("function")
    expect(Dialog.Content).toBeTypeOf("function")
  })

  it("stacks title and description as block text in mini-program text nodes", () => {
    expect(getClassName(Dialog.Title({ children: "Title" }) as ReactElement)).toContain("block")
    expect(getClassName(Dialog.Description({ children: "Description" }) as ReactElement)).toContain("block")
  })

  it("centers the close touch target with flex layout", () => {
    expect(source).toContain("flex min-h-[88rpx] flex-row items-center justify-center")
  })
})
