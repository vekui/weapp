import * as React from "react"
import { describe, expect, it } from "vitest"

import actionSheetSource from "./action-sheet.tsx?raw"
import accordionSource from "./accordion.tsx?raw"
import { Alert } from "./alert"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import collapsibleSource from "./collapsible.tsx?raw"
import dialogSource from "./dialog.tsx?raw"
import gridSource from "./grid.tsx?raw"
import { Input } from "./input"
import itemSource from "./item.tsx?raw"
import { Label } from "./label"
import listSource from "./list.tsx?raw"
import { Loading } from "./loading"
import popoverSource from "./popover.tsx?raw"
import { Progress } from "./progress"
import { Separator } from "./separator"
import sheetSource from "./sheet.tsx?raw"
import { Skeleton } from "./skeleton"
import stepsSource from "./steps.tsx?raw"
import switchSource from "./switch.tsx?raw"
import { Tag } from "./tag"
import { Textarea } from "./textarea"
import timelineSource from "./timeline.tsx?raw"

function getProps(element: React.ReactNode) {
  expect(React.isValidElement(element)).toBe(true)
  return (element as React.ReactElement<Record<string, unknown>>).props
}

function getClassName(element: React.ReactNode) {
  return String(getProps(element).className ?? "")
}

const forbiddenMiniProgramPatterns = [
  "win" + "dow",
  "docu" + "ment",
  "createPortal",
  `React${"DOM"}`,
  "hover:",
  "translate-x-"
]

function expectMiniProgramSafeSource(source: string) {
  for (const pattern of forbiddenMiniProgramPatterns) {
    expect(source).not.toContain(pattern)
  }
}

describe("component contracts", () => {
  it("keeps button loading state disabled and token based", () => {
    const props = getProps(Button({ loading: true, children: "Save" }))

    expect(props.disabled).not.toBe(true)
    expect(props["aria-disabled"]).toBe("true")
    expect(props["data-loading"]).toBe("true")
    expect(String(props.className)).toContain("bg-primary")
    expect(String(props.className)).toContain("text-primary-foreground")
  })

  it("keeps badge variants token based", () => {
    expect(getClassName(Badge({ variant: "secondary", children: "New" }))).toContain(
      "bg-secondary"
    )
    expect(getClassName(Badge({ variant: "outline", children: "Draft" }))).toContain(
      "border-border"
    )
  })

  it("keeps card slots composable and token based", () => {
    expect(getClassName(Card({}))).toContain("bg-card")
    expect(getClassName(CardHeader({}))).toContain("p-4")
    expect(getClassName(CardTitle({ children: "Title" }))).toContain("text-foreground")
    expect(getClassName(CardDescription({ children: "Description" }))).toContain(
      "text-muted-foreground"
    )
    expect(getClassName(CardContent({}))).toContain("pt-0")
    expect(getClassName(CardFooter({}))).toContain("items-center")
  })

  it("keeps form fields invalid-state aware", () => {
    const inputProps = getProps(Input({ invalid: true }))
    const textareaProps = getProps(Textarea({ invalid: true }))

    expect(inputProps["data-invalid"]).toBe("true")
    expect(String(inputProps.className)).toContain("border-destructive")
    expect(textareaProps["data-invalid"]).toBe("true")
    expect(String(textareaProps.className)).toContain("border-destructive")
  })

  it("keeps feedback and structure components token based", () => {
    const loadingChildren = React.Children.toArray(
      getProps(Loading({})).children as React.ReactNode
    )

    expect(getClassName(loadingChildren[1])).toContain("text-muted-foreground")
    expect(getClassName(Separator({ orientation: "vertical" }))).toContain("h-full w-px")
    expect(getClassName(Skeleton({}))).toContain("bg-muted")
  })

  it("keeps switch movement compatible with WXSS", () => {
    expect(switchSource).toContain("transition-[margin]")
    expect(switchSource).toContain("ml-[40rpx]")
    expect(switchSource).not.toContain("translate-x-")
  })

  it("keeps chunk 2 components token based", () => {
    expect(Alert.Root({}).props.className).toContain("border-border")
    expect(Label({ required: true }).props["data-required"]).toBe("")
    expect(Progress({ value: 50 }).props["data-value"]).toBe(50)
    expect(Tag({ selected: true }).props["data-state"]).toBe("selected")
  })

  it("keeps overlay components layer-based and portal-free", () => {
    for (const source of [actionSheetSource, dialogSource, sheetSource]) {
      expect(source).toContain("Layer.Root")
      expect(source).toContain("Layer.Content")
      expectMiniProgramSafeSource(source)
    }

    expect(popoverSource).toContain("Pressable")
    expectMiniProgramSafeSource(popoverSource)
  })

  it("keeps chunk 4 content and layout components tokenized and touch safe", () => {
    for (const source of [
      accordionSource,
      collapsibleSource,
      gridSource,
      itemSource,
      listSource,
      stepsSource,
      timelineSource
    ]) {
      expect(source).toContain("text-foreground")
      expect(source).toContain("data-state")
      expectMiniProgramSafeSource(source)
    }

    expect(accordionSource).toContain("border-border")
    expect(collapsibleSource).toContain("min-h-[88rpx]")
    expect(gridSource).toContain("grid-cols-3")
    expect(itemSource).toContain("text-muted-foreground")
    expect(listSource).toContain("data-disabled")
    expect(stepsSource).toContain("bg-primary")
    expect(timelineSource).toContain("bg-destructive")
  })
})
