import * as React from "react"
import { act, create, type ReactTestInstance } from "react-test-renderer"
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  Field,
  FieldError,
  FieldLabel,
  Input,
  RadioGroup,
  Switch,
  Tabs,
  Textarea,
  Toast,
  ToastViewport
} from "./index"

function byType(root: ReactTestInstance, type: string) {
  const node = root.findAll((candidate) => candidate.type === type)[0]
  if (!node) {
    throw new Error(`Missing test renderer node: ${type}`)
  }
  return node
}

function allByType(root: ReactTestInstance, type: string) {
  return root.findAll((candidate) => candidate.type === type)
}

function classNameOf(node: ReactTestInstance) {
  return String(node.props.className ?? "")
}

describe("v0 component contracts", () => {
  it("Button exposes variant classes and loading state", () => {
    const tree = create(
      <Button loading variant="secondary">
        Save
      </Button>
    )
    const button = byType(tree.root, "Button")

    expect(button.props["data-loading"]).toBe("true")
    expect(button.props.disabled).toBe(true)
    expect(classNameOf(button)).toContain("bg-secondary")
    expect(classNameOf(button)).toContain("text-secondary-foreground")
  })

  it("Card and Badge use semantic token classes", () => {
    const tree = create(
      <Card>
        <Badge variant="outline">New</Badge>
      </Card>
    )
    const card = byType(tree.root, "View")
    const badge = byType(tree.root, "Text")

    expect(classNameOf(card)).toContain("bg-card")
    expect(classNameOf(card)).toContain("border-border")
    expect(classNameOf(badge)).toContain("border-border")
  })

  it("Field, Input, and Textarea reflect invalid and disabled states", () => {
    const tree = create(
      <Field invalid>
        <FieldLabel>Name</FieldLabel>
        <Input disabled invalid value="Ada" />
        <Textarea invalid value="Notes" />
        <FieldError>Required</FieldError>
      </Field>
    )
    const views = allByType(tree.root, "View")
    const input = byType(tree.root, "Input")
    const textarea = byType(tree.root, "Textarea")
    const labels = allByType(tree.root, "Text")

    expect(views[0]?.props["data-invalid"]).toBe("true")
    expect(input.props["data-disabled"]).toBe("true")
    expect(input.props["data-invalid"]).toBe("true")
    expect(textarea.props["data-invalid"]).toBe("true")
    expect(classNameOf(input)).toContain("bg-background")
    expect(classNameOf(textarea)).toContain("border-destructive")
    expect(labels.map(classNameOf).join(" ")).toContain("text-foreground")
  })

  it("Checkbox toggles with data-state and does not depend on DOM APIs", () => {
    const onCheckedChange = vi.fn()
    const tree = create(<Checkbox label="Accept" onCheckedChange={onCheckedChange} />)
    const checkbox = allByType(tree.root, "View")[0]

    expect(checkbox?.props["data-state"]).toBe("unchecked")
    act(() => checkbox?.props.onClick())
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(allByType(tree.root, "View")[0]?.props["data-state"]).toBe("checked")
  })

  it("RadioGroup reflects selected option state", () => {
    const onValueChange = vi.fn()
    const tree = create(
      <RadioGroup
        onValueChange={onValueChange}
        options={[
          { label: "A", value: "a" },
          { label: "B", value: "b" }
        ]}
      />
    )
    const option = tree.root.findAllByProps({ "data-state": "unchecked" })[0]

    act(() => option?.props.onClick())
    expect(onValueChange).toHaveBeenCalledWith("a")
    expect(tree.root.findAllByProps({ "data-state": "checked" }).length).toBeGreaterThan(0)
  })

  it("Switch uses margin transition instead of translate utilities", () => {
    const tree = create(<Switch defaultChecked />)
    const switchRoot = allByType(tree.root, "View")[0]
    const thumb = allByType(tree.root, "View")[1]

    expect(switchRoot?.props["data-state"]).toBe("checked")
    expect(classNameOf(thumb!)).toContain("transition-[margin]")
    expect(classNameOf(thumb!)).not.toContain("translate-")
  })

  it("Tabs exposes active state and renders selected content", () => {
    const tree = create(
      <Tabs
        items={[
          { content: "One panel", label: "One", value: "one" },
          { content: "Two panel", label: "Two", value: "two" }
        ]}
      />
    )

    expect(tree.root.findAllByProps({ "data-state": "active" }).length).toBeGreaterThan(0)
    expect(JSON.stringify(tree.toJSON())).toContain("One panel")
  })

  it("Dialog renders through the Layer primitive without portal APIs", () => {
    const onOpenChange = vi.fn()
    const tree = create(
      <Dialog description="Body" onOpenChange={onOpenChange} open title="Title">
        Content
      </Dialog>
    )
    const openNodes = tree.root.findAllByProps({ "data-state": "open" })

    expect(openNodes.length).toBeGreaterThanOrEqual(2)
    expect(JSON.stringify(tree.toJSON())).toContain("Content")
    act(() => byType(tree.root, "Button").props.onClick())
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it("Toast and ToastViewport use app-tree rendering state", () => {
    const tree = create(
      <ToastViewport>
        <Toast description="Saved" title="Done" tone="success" />
      </ToastViewport>
    )
    const toast = tree.root.findByProps({ "data-tone": "success" })

    expect(toast.props["data-state"]).toBe("open")
    expect(classNameOf(toast)).toContain("border-primary")
  })
})
