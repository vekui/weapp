import * as React from "react"
import { create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./alert-dialog.tsx?raw"
import { AlertDialog, getAlertDialogState } from "./alert-dialog"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("AlertDialog", () => {
  it("exposes open state and compound parts for confirmation flows", () => {
    expect(getAlertDialogState(true)).toBe("open")
    expect(getAlertDialogState(false)).toBe("closed")
    expect(AlertDialog.Root).toBeTypeOf("function")
    expect(AlertDialog.Content).toBeTypeOf("function")
    expect(AlertDialog.Action).toBeTypeOf("function")
    expect(AlertDialog.Cancel).toBeTypeOf("function")
  })

  it("uses app-tree layers and avoids browser-only APIs", () => {
    expect(source).toContain("Layer.Root")
    expect(source).toContain("Layer.Backdrop")
    expect(source).not.toContain("createPortal")
    expect(source).not.toContain("ReactDOM")
    expect(source).not.toContain("window")
    expect(source).not.toContain("document")
  })

  it("renders semantic token classes and touch-sized action rows", () => {
    const tree = create(
      React.createElement(AlertDialog, {
        open: true,
        title: "Delete project?",
        description: "This action cannot be undone.",
        cancelText: "Cancel",
        actionText: "Delete"
      })
    )
    const classNames = collectClassNames(tree.root)

    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("text-foreground"),
        expect.stringContaining("text-muted-foreground"),
        expect.stringContaining("bg-primary"),
        expect.stringContaining("border-border"),
        expect.stringContaining("min-h-[88rpx]")
      ])
    )
  })

  it("uses a mobile-balanced action area for dialog decisions", () => {
    const tree = create(
      React.createElement(AlertDialog, {
        open: true,
        title: "Delete project?",
        description: "This action cannot be undone.",
        cancelText: "Cancel",
        actionText: "Delete"
      })
    )
    const classNames = collectClassNames(tree.root)

    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("grid grid-cols-2"),
        expect.stringContaining("gap-3"),
        expect.stringContaining("min-w-0"),
        expect.stringContaining("w-full")
      ])
    )
    expect(source).toContain('variant = "outline"')
  })
})
