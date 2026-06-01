import * as React from "react"
import { create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./data-table.tsx?raw"
import { DataTable } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("DataTable", () => {
  it("exposes compound parts and uses the existing table surface", () => {
    expect(DataTable.Root).toBeTypeOf("function")
    expect(DataTable.Header).toBeTypeOf("function")
    expect(DataTable.Row).toBeTypeOf("function")
    expect(DataTable.Cell).toBeTypeOf("function")
    expect(DataTable).toBeTypeOf("function")
    expect(source).toContain("Table")
    expectMiniProgramSafeSource(source)
  })

  it("renders columns and rows with token classes and row state", () => {
    const tree = create(
      React.createElement(DataTable, {
        columns: [{ key: "name", title: "Name" }, { key: "role", title: "Role" }],
        rows: [{ id: "1", name: "Ada", role: "Admin" }]
      })
    )
    const classNames = collectClassNames(tree.root)
    const rows = findAllByHostType(tree.root, "View").filter((node) => node.props["data-row-id"])

    expect(rows[0]?.props["data-state"]).toBe("default")
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("bg-card"),
        expect.stringContaining("border-border"),
        expect.stringContaining("text-foreground")
      ])
    )
  })
})
