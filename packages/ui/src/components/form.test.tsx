import * as React from "react"
import { create } from "react-test-renderer"
import { describe, expect, it } from "vitest"

import source from "./form.tsx?raw"
import { Form } from "./form"
import { expectMiniProgramSafeSource, findAllByHostType, findByType } from "../test/component-test-utils"

describe("Form", () => {
  it("reflects invalid state on root and item while keeping tokenized layout", () => {
    const tree = create(
      <Form invalid>
        <Form.Item invalid>
          <Form.Actions />
        </Form.Item>
      </Form>
    )
    const form = findByType(tree.root, "Form")
    const views = findAllByHostType(tree.root, "View")

    expect(form.props["data-invalid"]).toBe("")
    expect(form.props["data-state"]).toBe("invalid")
    expect(String(form.props.className)).toContain("gap-3")
    expect(views[0]?.props["data-state"]).toBe("invalid")
    expect(String(views[0]?.props.className)).toContain("gap-2")
    expect(String(views[1]?.props.className)).toContain("flex-row")
  })

  it("uses Taro Form and mini-program-safe source", () => {
    expect(source).toContain("@tarojs/components")
    expect(source).toContain("data-invalid")
    expectMiniProgramSafeSource(source)
  })
})
