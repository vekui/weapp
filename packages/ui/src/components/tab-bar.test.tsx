import * as React from "react"
import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./tab-bar.tsx?raw"
import { TabBar, TabBarItem, getTabBarItemState } from "./tab-bar"
import { expectMiniProgramSafeSource, findAllByHostType } from "../test/component-test-utils"

describe("TabBar", () => {
  it("derives active item state and renders safe-area-aware root", () => {
    expect(getTabBarItemState("home", "home")).toBe("active")
    expect(getTabBarItemState("home", "settings")).toBe("inactive")

    const tree = create(
      <TabBar value="home">
        <TabBarItem value="home" icon="home" label="Home" />
        <TabBarItem value="settings" label="Settings" />
      </TabBar>
    )
    const root = findAllByHostType(tree.root, "View")[0]

    expect(root?.props["data-value"]).toBe("home")
    expect(String(root?.props.className)).toContain("pb-[env(safe-area-inset-bottom)]")
    expect(tree.root.findByProps({ "data-state": "active" })).toBeTruthy()
  })

  it("emits value changes and keeps icon dependency local", () => {
    const onValueChange = vi.fn()
    const tree = create(
      <TabBar defaultValue="home" onValueChange={onValueChange}>
        <TabBarItem value="settings" icon="grid-2x2" />
      </TabBar>
    )
    const item = tree.root.findByProps({ "data-state": "inactive" })

    act(() => item.props.onClick({ type: "tap" }))
    expect(onValueChange).toHaveBeenCalledWith("settings")
    expect(source).toContain("Icon")
    expectMiniProgramSafeSource(source)
  })
})
