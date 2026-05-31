import { describe, expect, it } from "vitest"

import source from "./carousel.tsx?raw"
import { Carousel } from "./carousel"

describe("Carousel", () => {
  it("uses Taro swiper primitives with ready state", () => {
    expect(Carousel.Root({}).props["data-state"]).toBe("ready")
    expect(Carousel.Root({}).props.indicatorDots).toBe(true)
    expect(Carousel.Root({}).props.circular).toBe(true)
    expect(Carousel.Root({}).props.className).toContain("bg-muted")
    expect(Carousel.Item({}).props["data-state"]).toBe("default")
    expect(Carousel.Item({}).props.className).toContain("h-full")
    expect(source).toContain("@tarojs/components")
  })
})
