import { describe, expect, it } from "vitest"

import imageSource from "./image.tsx?raw"
import { Image } from "./image"

describe("Image", () => {
  it("renders loaded images with Taro image props and token classes", () => {
    const element = Image({ className: "custom-image", src: "avatar.png" })

    expect(element.props["data-state"]).toBe("loaded")
    expect(element.props.mode).toBe("aspectFill")
    expect(element.props.src).toBe("avatar.png")
    expect(element.props.className).toContain("bg-muted")
    expect(element.props.className).toContain("rounded-md")
    expect(element.props.className).toContain("custom-image")
  })

  it("renders an empty fallback without browser-only APIs", () => {
    const element = Image({ fallbackClassName: "h-[220rpx]", rounded: false, src: "" })

    expect(element.props["data-state"]).toBe("empty")
    expect(element.props.className).toContain("border-border")
    expect(element.props.className).toContain("bg-muted")
    expect(element.props.className).toContain("text-muted-foreground")
    expect(element.props.className).toContain("h-[220rpx]")
    expect(imageSource).not.toContain("window")
    expect(imageSource).not.toContain("document")
    expect(imageSource).not.toContain("ReactDOM")
  })
})
