import { describe, expect, it } from "vitest"

import source from "./avatar.tsx?raw"
import { Avatar, AvatarFallback, AvatarImage, getAvatarState } from "./avatar"

describe("Avatar", () => {
  it("reports image and fallback states with token classes", () => {
    expect(getAvatarState({ src: "avatar.png" })).toBe("image")
    expect(getAvatarState({})).toBe("fallback")
    expect(Avatar({ src: "avatar.png" }).props["data-state"]).toBe("image")
    expect(Avatar({}).props.className).toContain("rounded-full")
    expect(AvatarImage({ src: "avatar.png" }).props.mode).toBe("aspectFill")
    expect(AvatarFallback({ children: "A" }).props["data-state"]).toBe("fallback")
    expect(AvatarFallback({}).props.className).toContain("text-muted-foreground")
    expect(source).not.toContain("ReactDOM")
  })
})
