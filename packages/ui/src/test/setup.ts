import * as React from "react"
import { vi } from "vitest"

function createTaroComponent(name: string) {
  const Component = React.forwardRef<unknown, Record<string, unknown>>((props, ref) => {
    return React.createElement(name, { ...props, ref }, props.children as React.ReactNode)
  })
  Component.displayName = name
  return Component
}

vi.mock("@tarojs/components", () => ({
  Button: createTaroComponent("Button"),
  Form: createTaroComponent("Form"),
  Image: createTaroComponent("Image"),
  Input: createTaroComponent("Input"),
  Picker: createTaroComponent("Picker"),
  PickerView: createTaroComponent("PickerView"),
  PickerViewColumn: createTaroComponent("PickerViewColumn"),
  ScrollView: createTaroComponent("ScrollView"),
  Slider: createTaroComponent("Slider"),
  Swiper: createTaroComponent("Swiper"),
  SwiperItem: createTaroComponent("SwiperItem"),
  Text: createTaroComponent("Text"),
  Textarea: createTaroComponent("Textarea"),
  View: createTaroComponent("View")
}))
