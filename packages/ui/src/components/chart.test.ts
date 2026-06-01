import * as React from "react"
import { create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./chart.tsx?raw"
import { Chart, getChartToneClass } from "."
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

function collectClassNames(root: ReactTestInstance): string[] {
  return root
    .findAll(() => true)
    .map((node) => String(node.props.className ?? ""))
    .filter(Boolean)
}

describe("Chart", () => {
  it("maps tone classes and exposes a public component", () => {
    expect(getChartToneClass("primary")).toContain("bg-primary")
    expect(getChartToneClass("muted")).toContain("bg-muted")
    expect(Chart).toBeTypeOf("function")
  })

  it("renders tokenized bars without canvas or browser APIs", () => {
    expect(source).not.toContain("canvas")
    expect(source).not.toContain("getContext")
    expectMiniProgramSafeSource(source)

    const tree = create(
      React.createElement(Chart, { data: [{ label: "A", value: 30 }, { label: "B", value: 70 }] })
    )
    const classNames = collectClassNames(tree.root)
    const bars = findAllByHostType(tree.root, "View").filter((node) => node.props["data-value"])

    expect(bars).toHaveLength(2)
    expect(classNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining("bg-card"),
        expect.stringContaining("border-border"),
        expect.stringContaining("text-card-foreground")
      ])
    )
  })
})
