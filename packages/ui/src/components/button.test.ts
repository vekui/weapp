import { describe, expect, it } from "vitest"

import { Button } from "./button"
import { buttonVariants } from "./button-variants"

describe("buttonVariants", () => {
  it("uses semantic tokens for visual variants", () => {
    expect(buttonVariants({ variant: "secondary", size: "lg" })).toContain(
      "bg-secondary"
    )
    expect(buttonVariants({ variant: "destructive" })).toContain(
      "bg-destructive"
    )
  })

  it("keeps shadcn-like size steps visually distinct", () => {
    const xs = buttonVariants({ size: "xs" })
    const sm = buttonVariants({ size: "sm" })
    const base = buttonVariants({ size: "default" })
    const lg = buttonVariants({ size: "lg" })
    const iconSm = buttonVariants({ size: "icon-sm" })
    const icon = buttonVariants({ size: "icon" })
    const iconLg = buttonVariants({ size: "icon-lg" })

    expect(xs).toContain("h-[56rpx]")
    expect(xs).toContain("px-2")
    expect(sm).toContain("h-[72rpx]")
    expect(base).toContain("h-[88rpx]")
    expect(lg).toContain("h-[104rpx]")
    expect(iconSm).toContain("size-[72rpx]")
    expect(icon).toContain("size-[88rpx]")
    expect(iconLg).toContain("size-[104rpx]")
    expect(base).not.toContain("min-h-[88rpx]")
  })
})

describe("Button", () => {
  it("uses the native Taro button surface for mini-program actions", () => {
    const element = Button({
      children: "Share",
      formType: "submit",
      full: true,
      openType: "share",
      shape: "rounded"
    })

    expect(element.type).toBeTruthy()
    expect(element.props.openType).toBe("share")
    expect(element.props.formType).toBe("submit")
    expect(element.props.hoverClass).toBe("none")
    expect(element.props.className).toContain("w-full")
    expect(element.props.className).toContain("rounded-full")
  })

  it("reflects loading through native props and state attributes", () => {
    const element = Button({ loading: true, children: "Loading" })

    expect(element.props.loading).toBe(true)
    expect(element.props.disabled).toBe(true)
    expect(element.props["data-loading"]).toBe("true")
  })

  it("marks the native Taro button with a reset hook class", () => {
    const element = Button({ variant: "outline", children: "Outline" })

    expect(element.props.className).toContain("ui-button")
  })
})
