import * as React from "react"
import { create } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import aspectRatioSource from "./aspect-ratio.tsx?raw"
import { AspectRatio, getAspectRatioPadding } from "./aspect-ratio"
import { ActivityIndicator } from "./activity-indicator"
import alertSource from "./alert.tsx?raw"
import avatarSource from "./avatar.tsx?raw"
import { Avatar, AvatarFallback, AvatarImage, getAvatarState } from "./avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb"
import { Countdown, formatCountdown } from "./countdown"
import { DataList } from "./data-list"
import { Divider } from "./divider"
import { Fab } from "./fab"
import iconSource from "./icon.tsx?raw"
import { Icon, getLucideIconDataUri } from "./icon"
import imageSource from "./image.tsx?raw"
import { Image } from "./image"
import { InputNumber, clampInputNumber } from "./input-number"
import { InputOTP, getOtpSlotState } from "./input-otp"
import { LoadMore, getLoadMoreText } from "./load-more"
import { Message } from "./message"
import { NavBar } from "./nav-bar"
import { NoticeBar } from "./notice-bar"
import { Pagination, getPaginationState } from "./pagination"
import { Rate, getRateItemState } from "./rate"
import safeAreaSource from "./safe-area.tsx?raw"
import { SafeArea, getSafeAreaClass } from "./safe-area"
import scrollAreaSource from "./scroll-area.tsx?raw"
import { ScrollArea } from "./scroll-area"
import segmentedControlSource from "./segmented-control.tsx?raw"
import { SegmentedControl, getSegmentedControlState } from "./segmented-control"
import sliderSource from "./slider.tsx?raw"
import { Slider } from "./slider"
import tabBarSource from "./tab-bar.tsx?raw"
import { TabBar, TabBarItem, getTabBarItemState } from "./tab-bar"
import { Table } from "./table"
import { Typography } from "./typography"

function getProps(element: React.ReactNode) {
  expect(React.isValidElement(element)).toBe(true)
  return (element as React.ReactElement<Record<string, unknown>>).props
}

function getClassName(element: React.ReactNode) {
  return String(getProps(element).className ?? "")
}

function getRenderedProps(element: React.ReactElement, type: string) {
  const node = create(element).root.findAll((candidate) => candidate.type === type)[0]
  if (!node) {
    throw new Error(`Missing rendered node: ${type}`)
  }
  return node.props as Record<string, unknown>
}

function expectMiniProgramSafeSource(source: string) {
  for (const pattern of [
    "win" + "dow",
    "docu" + "ment",
    "React" + "DOM",
    "HTML" + "Element",
    "hover:",
    "translate-"
  ]) {
    expect(source).not.toContain(pattern)
  }
}

describe("next production wave components", () => {
  it("keeps foundation and layout components tokenized", () => {
    expect(getAspectRatioPadding(16, 9)).toBe("56.25%")
    expect(getProps(AspectRatio({ ratio: 16 / 9 }))["data-ratio"]).toBe("16:9")
    expect(getClassName(Divider({ children: "or" }))).toContain("border-border")
    expect(getLucideIconDataUri("plus")).toContain("data:image/svg+xml")
    expect(getLucideIconDataUri("calendar")).toContain("data:image/svg+xml")
    expect(getClassName(Icon({ name: "plus" }))).toContain("h-[48rpx]")
    expect(getClassName(Icon({ name: "plus" }))).toContain("w-[48rpx]")
    expect(getSafeAreaClass("bottom")).toContain("pb-[env(safe-area-inset-bottom)]")
    expect(getProps(SafeArea({ edge: "both" }))["data-edge"]).toBe("both")
    expect(getClassName(Typography.H1({ children: "Title" }))).toContain("text-foreground")
    expect(getClassName(ScrollArea({ scrollY: true }))).toContain("overflow-hidden")

    for (const source of [aspectRatioSource, safeAreaSource, scrollAreaSource]) {
      expectMiniProgramSafeSource(source)
    }

    expect(iconSource).toContain("lucideIconPaths")
    expect(iconSource).toContain("grid-2x2")
  })

  it("keeps display components stateful and mini-program safe", () => {
    expect(getAvatarState({ src: "avatar.png" })).toBe("image")
    expect(getAvatarState({})).toBe("fallback")
    expect(getProps(Avatar({ children: "A" }))["data-state"]).toBe("fallback")
    expect(getClassName(AvatarImage({ src: "avatar.png" }))).toContain("rounded-full")
    expect(getClassName(AvatarFallback({ children: "A" }))).toContain("bg-muted")
    expect(getClassName(Image({ src: "image.png", mode: "aspectFill" }))).toContain("bg-muted")
    expect(getClassName(Image({ src: "" }))).toContain("border-border")
    expect(getClassName(Fab({ children: "+" }))).toContain("fixed")

    for (const source of [avatarSource, imageSource]) {
      expectMiniProgramSafeSource(source)
    }
  })

  it("keeps feedback components data-state based", () => {
    expect(getClassName(ActivityIndicator({ text: "Loading" }))).toContain("text-muted-foreground")
    expect(getLoadMoreText("done")).toBe("No more")
    expect(getProps(LoadMore({ status: "loading" }))["data-state"]).toBe("loading")
    expect(getProps(Message({ variant: "success" }))["data-state"]).toBe("success")
    expect(getProps(NoticeBar({ variant: "warning" }))["data-state"]).toBe("warning")
    expect(formatCountdown(3661)).toBe("01:01:01")
    expect(getProps(Countdown({ seconds: 90 }))["data-seconds"]).toBe(90)
  })

  it("keeps form and choice components touch-friendly", () => {
    expect(clampInputNumber(12, { min: 0, max: 10 })).toBe(10)
    expect(getProps(InputNumber({ value: 3 }))["data-value"]).toBe(3)
    expect(getOtpSlotState("12", 1)).toBe("filled")
    expect(getProps(InputOTP({ value: "12", length: 4 }))["data-length"]).toBe(4)
    expect(getProps(Slider({ value: 50 }))["data-value"]).toBe(50)
    expect(sliderSource).not.toContain('activeColor="var(')
    expect(sliderSource).not.toContain('backgroundColor="var(')
    expect(getRateItemState(3, 4)).toBe("selected")
    expect(getRenderedProps(React.createElement(Rate, { value: 3 }), "View")["data-value"]).toBe(3)
    expect(sliderSource).toContain("onValueChange")
    expect(getSegmentedControlState("a", "a")).toBe("active")
    expect(segmentedControlSource).toContain("createStrictContext")
    expect(segmentedControlSource).toContain("useControllableState")
    expect(segmentedControlSource).not.toContain("currentValue?:")
  })

  it("keeps data and navigation components token based", () => {
    expect(getClassName(DataList.Root({}))).toContain("bg-card")
    expect(getProps(DataList.Item({ label: "Name", value: "Ada" }))["data-state"]).toBe("default")
    expect(getClassName(Table.Root({}))).toContain("border-border")
    expect(getClassName(Breadcrumb({}))).toContain("flex-row")
    expect(getClassName(BreadcrumbItem({ children: "Home" }))).toContain("text-foreground")
    expect(getClassName(BreadcrumbSeparator({ children: "/" }))).toContain("text-muted-foreground")
    expect(getClassName(NavBar({ title: "Title" }))).toContain("min-h-[88rpx]")
    expect(getPaginationState(1, 3)).toBe("first")
    expect(getProps(Pagination({ page: 1, pageCount: 3 }))["data-state"]).toBe("first")
    expect(getTabBarItemState("home", "home")).toBe("active")
    expect(tabBarSource).toContain("createStrictContext")
    expect(tabBarSource).toContain("useControllableState")
    expect(tabBarSource).not.toContain("currentValue?:")
    expect(tabBarSource).toContain("Icon")
  })

  it("keeps text and icon-heavy feedback visually separated", () => {
    expect(alertSource).toContain("flex flex-col")
    expect(alertSource).toContain("AlertTitle")
    expect(alertSource).not.toContain("mt-1 text-sm")
    expect(iconSource).not.toContain("children")
  })
})
