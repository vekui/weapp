import { create } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./drawer.tsx?raw"
import { Drawer } from "./drawer"

describe("Drawer", () => {
  it("wraps Sheet with left/right side content", () => {
    const tree = create(
      <Drawer.Root open>
        <Drawer.Content side="right">
          <Drawer.Title>Title</Drawer.Title>
          <Drawer.Description>Description</Drawer.Description>
        </Drawer.Content>
      </Drawer.Root>
    )
    const content = tree.root.findByProps({ "data-side": "right" })

    expect(content.props["data-state"]).toBe("open")
    expect(content.props.className).toContain("right-0")
    expect(source).toContain("Sheet.Content")
    expect(source).not.toContain("createPortal")
  })
})
