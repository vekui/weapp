import { describe, expect, it } from "vitest"

import { demoComponents } from "../../../../apps/miniprogram/src/demo/catalog"
import { publicComponentNames } from "../manifest"

const demoSlugAliases: Record<string, string | null> = {
  color: null,
  navbar: "nav-bar",
  noticebar: "notice-bar",
  radio: "radio-group",
  swiper: "carousel",
  tabbar: "tab-bar",
  typo: "typography"
}

function toRegistryName(slug: string) {
  if (Object.prototype.hasOwnProperty.call(demoSlugAliases, slug)) {
    return demoSlugAliases[slug]
  }

  return slug
}

describe("miniprogram demo catalog", () => {
  it("covers every public registry component", () => {
    const demoRegistryNames = new Set(
      demoComponents
        .map((component) => toRegistryName(component.slug))
        .filter((name): name is string => Boolean(name))
    )

    expect(publicComponentNames.filter((name) => !demoRegistryNames.has(name))).toEqual([])
  })
})
