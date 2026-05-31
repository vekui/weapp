import * as React from "react"
import { create, type ReactTestInstance } from "react-test-renderer"
import { expect } from "vitest"

export function getProps(element: React.ReactNode) {
  expect(React.isValidElement(element)).toBe(true)
  return (element as React.ReactElement<Record<string, unknown>>).props
}

export function getClassName(element: React.ReactNode) {
  return String(getProps(element).className ?? "")
}

export function renderRoot(element: React.ReactElement) {
  return create(element).root
}

export function findByType(root: ReactTestInstance, type: string) {
  const node = root.findAll((candidate) => candidate.type === type)[0]
  if (!node) {
    throw new Error(`Missing rendered node: ${type}`)
  }
  return node
}

export function findAllByHostType(root: ReactTestInstance, type: string) {
  return root.findAll((candidate) => candidate.type === type)
}

export function findByHostType(root: ReactTestInstance, type: string) {
  const node = findAllByHostType(root, type)[0]
  if (!node) {
    throw new Error(`Missing rendered node: ${type}`)
  }
  return node
}

export function expectMiniProgramSafeSource(source: string) {
  for (const pattern of [
    "win" + "dow",
    "docu" + "ment",
    "React" + "DOM",
    "HTML" + "Element",
    "@radix" + "-ui/",
    "lucide" + "-react",
    "hover:",
    "space" + "-x-",
    "space" + "-y-",
    "translate" + "-"
  ]) {
    expect(source).not.toContain(pattern)
  }
}
