import { act, create } from "react-test-renderer"
import { describe, expect, it, vi } from "vitest"

import source from "./calendar.tsx?raw"
import { Calendar, getCalendarDayState, getCalendarMonthDays } from "./calendar"

describe("Calendar", () => {
  it("computes month days and selected states", () => {
    const days = getCalendarMonthDays("2026-05")

    expect(days).toHaveLength(42)
    expect(getCalendarDayState(days.find((day) => day.date === "2026-05-01")!, "2026-05-01")).toBe("selected")
    expect(getCalendarDayState(days[0]!)).toBe("muted")
  })

  it("renders tokenized day buttons and emits value changes", () => {
    const onValueChange = vi.fn()
    const tree = create(<Calendar month="2026-05" onValueChange={onValueChange} />)
    const root = tree.root.findByProps({ "data-month": "2026-05" })
    const day = tree.root.findByProps({ "data-date": "2026-05-02" })

    expect(root.props["data-state"]).toBe("default")
    expect(root.props.className).toContain("border-border")
    expect(day.props.className).toContain("min-h-[72rpx]")
    act(() => day.props.onClick())
    expect(onValueChange).toHaveBeenCalledWith("2026-05-02")
    expect(source).not.toContain("window")
  })
})
