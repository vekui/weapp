import { describe, expect, it } from "vitest"

import source from "./table.tsx?raw"
import { Table } from "./table"
import { expectMiniProgramSafeSource, getClassName, getProps } from "../test/component-test-utils"

describe("Table", () => {
  it("renders tokenized table slots and selected row state", () => {
    expect(getClassName(Table.Root({}))).toContain("border-border")
    expect(getClassName(Table.Root({}))).toContain("bg-card")
    expect(getClassName(Table.Header({}))).toContain("bg-muted")
    expect(getProps(Table.Row({ selected: true }))["data-state"]).toBe("selected")
    expect(getClassName(Table.Row({ selected: true }))).toContain("bg-accent")
    expect(getClassName(Table.Cell({}))).toContain("text-foreground")
  })

  it("keeps source mini-program safe", () => {
    expect(source).toContain("last:border-b-0")
    expectMiniProgramSafeSource(source)
  })
})
