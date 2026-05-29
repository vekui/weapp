import { describe, expect, it } from "vitest"
import * as React from "react"

import { Button, type ButtonProps } from "./button"
import { ButtonGroup } from "./button-group"

describe("ButtonGroup", () => {
  it("uses mini-program-safe row layout and token borders", () => {
    const element = ButtonGroup({})

    expect(element.props.className).toContain("flex")
    expect(element.props.className).toContain("flex-row")
    expect(element.props.className).toContain("border-border")
    expect(element.props.className).toContain("self-start")
    expect(element.props.className).not.toContain("space-x-")
  })

  it("joins child buttons into a compact grouped control", () => {
    const element = ButtonGroup({
      children: [
        React.createElement(Button, { key: "left", variant: "secondary" }, "Left"),
        React.createElement(Button, { key: "right", variant: "secondary" }, "Right")
      ]
    })
    const children = React.Children.toArray(element.props.children)
    const left = children[0] as React.ReactElement<{
      className?: string
      "data-slot"?: string
    }>
    const right = children[1] as React.ReactElement<{
      className?: string
    }>

    expect(children).toHaveLength(2)
    expect(left.props.className ?? "").toContain("rounded-none")
    expect(left.props.className ?? "").toContain("border-r")
    expect(left.props["data-slot"]).toBe("button-group-item")
    expect(right.props.className ?? "").toContain("rounded-none")
    expect(right.props.className ?? "").not.toContain("border-r")

    const renderedLeft = Button(left.props as ButtonProps)
    expect(renderedLeft.props.className).toContain("rounded-none")
    expect(renderedLeft.props.className).toContain("border-r")
    expect(renderedLeft.props.className).toContain("border-border")
  })
})
