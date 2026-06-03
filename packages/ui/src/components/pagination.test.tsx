import { create, type ReactTestInstance } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import { Pagination } from "./pagination"

function getClassName(node: { props: { className?: unknown } }) {
  return String(node.props.className ?? "")
}

function allByType(root: ReactTestInstance, type: string) {
  return root.findAll((candidate) => candidate.type === type)
}

describe("Pagination", () => {
  it("renders page actions on the iOS-safe button surface", () => {
    const tree = create(<Pagination page={1} pageCount={5} />)
    const buttons = allByType(tree.root, "Button")
    const root = allByType(tree.root, "View")[0]

    expect(root?.props["data-state"]).toBe("first")
    expect(buttons).toHaveLength(2)
    expect(buttons[0]?.props.disabled).not.toBe(true)
    expect(buttons[0]?.props["data-disabled"]).toBe("true")
    expect(buttons[0]?.props["aria-disabled"]).toBe("true")
    expect(buttons[1]?.props.disabled).not.toBe(true)
    expect(buttons[1]?.props["data-disabled"]).toBeUndefined()

    for (const button of buttons) {
      expect(getClassName(button)).toContain("ui-button")
      expect(getClassName(button)).toContain("h-[72rpx]")
      expect(getClassName(button)).toContain("border-border")
    }
  })

  it("calls onPageChange with adjacent page numbers", () => {
    const changes: number[] = []
    const tree = create(
      <Pagination page={2} pageCount={5} onPageChange={(page) => changes.push(page)} />
    )
    const buttons = allByType(tree.root, "Button")

    buttons[0]?.props.onClick()
    buttons[1]?.props.onClick()

    expect(changes).toEqual([1, 3])
  })
})
