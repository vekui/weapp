import * as React from "react"
import { describe, expect, it } from "vitest"

import articleSource from "./article.tsx?raw"
import { Article } from "./article"
import calendarSource from "./calendar.tsx?raw"
import { Calendar, getCalendarDayState, getCalendarMonthDays } from "./calendar"
import carouselSource from "./carousel.tsx?raw"
import { Carousel } from "./carousel"
import curtainSource from "./curtain.tsx?raw"
import { Curtain } from "./curtain"
import drawerSource from "./drawer.tsx?raw"
import { Drawer } from "./drawer"
import flexSource from "./flex.tsx?raw"
import { Flex, FlexItem } from "./flex"
import floatLayoutSource from "./float-layout.tsx?raw"
import { FloatLayout } from "./float-layout"
import formSource from "./form.tsx?raw"
import { Form } from "./form"
import imagePickerSource from "./image-picker.tsx?raw"
import { ImagePicker } from "./image-picker"
import indexesSource from "./indexes.tsx?raw"
import { Indexes } from "./indexes"
import modalSource from "./modal.tsx?raw"
import { Modal } from "./modal"
import pickerSource from "./picker.tsx?raw"
import { Picker, getPickerLabel } from "./picker"
import pickerViewSource from "./picker-view.tsx?raw"
import { PickerView } from "./picker-view"
import rangeSource from "./range.tsx?raw"
import { Range, normalizeRange } from "./range"
import swipeActionSource from "./swipe-action.tsx?raw"
import { SwipeAction } from "./swipe-action"
import toastSource from "./toast.tsx?raw"
import { Toast } from "./toast"

function getProps(element: React.ReactNode) {
  expect(React.isValidElement(element)).toBe(true)
  return (element as React.ReactElement<Record<string, unknown>>).props
}

function getClassName(element: React.ReactNode) {
  return String(getProps(element).className ?? "")
}

function expectMiniProgramSafeSource(source: string) {
  for (const pattern of [
    "win" + "dow",
    "docu" + "ment",
    "React" + "DOM",
    "HTML" + "Element",
    "hover:",
    "translate-",
    "@radix" + "-ui/",
    "taro-ui"
  ]) {
    expect(source).not.toContain(pattern)
  }
}

describe("Taro-style demo wave components", () => {
  it("keeps article, flex, picker, and indexed-list components tokenized", () => {
    expect(getClassName(Article.Root({}))).toContain("bg-card")
    expect(getClassName(Article.Title({ children: "Title" }))).toContain("text-foreground")
    expect(getClassName(Flex({ align: "center", justify: "between" }))).toContain("items-center")
    expect(getClassName(Flex({ align: "center", justify: "between" }))).toContain("justify-between")
    expect(getClassName(FlexItem({ grow: true }))).toContain("flex-1")
    expect(getPickerLabel([{ label: "Alpha", value: "a" }], "a")).toBe("Alpha")
    expect(getProps(Picker({ options: [{ label: "Alpha", value: "a" }], value: "a" }))["data-state"]).toBe("selected")
    expect(getProps(Indexes({ sections: [{ key: "A", title: "A", items: [] }] }))["data-count"]).toBe(1)
    expect(getClassName(Indexes({ sections: [{ key: "A", title: "A", items: [] }] }))).toContain("overflow-hidden")
  })

  it("keeps calendar, carousel, range, and media components state based", () => {
    const days = getCalendarMonthDays("2026-05")

    expect(days).toHaveLength(42)
    expect(getCalendarDayState(days.find((day) => day.date === "2026-05-01")!, "2026-05-01")).toBe("selected")
    expect(getProps(Carousel.Root({ children: null }))["data-state"]).toBe("ready")
    expect(getProps(Carousel.Item({ children: "Slide" }))["data-state"]).toBe("default")
    expect(normalizeRange([90, 10], 0, 100)).toEqual([10, 90])
    expect(getProps(Range({ value: [10, 30] }))["data-value"]).toBe("10-30")
    expect(getProps(ImagePicker({ files: [{ id: "a", url: "a.png" }], maxCount: 1 }))["data-state"]).toBe("full")
  })

  it("keeps overlay and action components layer-backed and controllable", () => {
    expect(curtainSource).toContain("if (!currentOpen) return null")
    expect(floatLayoutSource).toContain("if (!currentOpen) return null")
    expect(Modal.Root).toBeTypeOf("function")
    expect(Drawer.Root).toBeTypeOf("function")
    expect(swipeActionSource).toContain("data-state={currentOpen ? \"open\" : \"closed\"}")
    expect(getProps(Toast({ open: true, variant: "success" }))["data-state"]).toBe("success")
  })

  it("keeps native form and picker-view wrappers mini-program compatible", () => {
    expect(Form({}).type).toBeTruthy()
    expect(getProps(Form({ invalid: true }))["data-invalid"]).toBe("")
    expect(getProps(Form.Item({ invalid: true }))["data-state"]).toBe("invalid")
    expect(PickerView.Root({ value: [0] }).type).toBeTruthy()
    expect(PickerView.Column({ children: null }).type).toBeTruthy()
    expect(getProps(PickerView.Option({ children: "One" }))["data-state"]).toBe("option")
  })

  it("keeps all new sources free of browser-only and desktop-only patterns", () => {
    for (const source of [
      articleSource,
      calendarSource,
      carouselSource,
      curtainSource,
      drawerSource,
      flexSource,
      floatLayoutSource,
      formSource,
      imagePickerSource,
      indexesSource,
      modalSource,
      pickerSource,
      pickerViewSource,
      rangeSource,
      swipeActionSource,
      toastSource
    ]) {
      expectMiniProgramSafeSource(source)
    }

    expect(curtainSource).toContain("Layer.Root")
    expect(floatLayoutSource).toContain("Layer.Root")
    expect(modalSource).toContain("Layer.Root")
    expect(rangeSource).not.toContain('activeColor="var(')
  })
})
