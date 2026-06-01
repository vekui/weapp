import * as React from "react"
import { create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./sonner.tsx?raw"
import { Sonner, getSonnerToneClass } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("Sonner", () => {
  it("maps tone classes and exposes toaster parts", () => {
    expect(getSonnerToneClass("success")).toContain("border-primary")
    expect(getSonnerToneClass("destructive")).toContain("border-destructive")
    expect(Sonner.Toaster).toBeTypeOf("function")
    expect(Sonner.Toast).toBeTypeOf("function")
    expect(Sonner.Title).toBeTypeOf("function")
    expect(Sonner.Description).toBeTypeOf("function")
    expect(source).not.toContain("createPortal")
    expectMiniProgramSafeSource(source)
  })

  it("renders stacked structured toasts with data tone and state", () => {
    const tree = create(
      React.createElement(
        Sonner.Toaster,
        { position: "bottom" },
        React.createElement(Sonner.Toast, { id: "saved", tone: "success", title: "Saved", description: "Done" }),
        React.createElement(Sonner.Toast, { id: "failed", tone: "destructive" },
          React.createElement(Sonner.Title, null, "Failed"),
          React.createElement(Sonner.Description, null, "Try again")
        )
      )
    )
    const classNames = collectClassNames(tree.root)
    const toasts = findAllByHostType(tree.root, "View").filter((node) => node.props["data-toast-id"])

    expect(tree.root.findByProps({ "data-position": "bottom" })).toBeTruthy()
    expect(toasts).toHaveLength(2)
    expect(toasts[0]?.props["data-state"]).toBe("open")
    expect(toasts[0]?.props["data-tone"]).toBe("success")
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("fixed"),
        expect.stringContaining("bg-card"),
        expect.stringContaining("border-primary")
      ])
    )
  })
})
