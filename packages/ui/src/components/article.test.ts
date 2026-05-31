import { describe, expect, it } from "vitest"

import source from "./article.tsx?raw"
import { Article } from "./article"

describe("Article", () => {
  it("exposes structured article slots with token classes", () => {
    expect(Article.Root({}).props["data-state"]).toBe("default")
    expect(Article.Root({}).props.className).toContain("bg-card")
    expect(Article.Title({}).props.className).toContain("text-foreground")
    expect(Article.Meta({}).props.className).toContain("text-muted-foreground")
    expect(Article.Paragraph({}).props.className).toContain("leading-[48rpx]")
    expect(Article.Section({}).props.className).toContain("gap-2")
    expect(source).not.toContain("document")
  })
})
