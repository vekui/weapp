import { useMDXComponents as getThemeComponents } from "nextra-theme-docs"
import type * as React from "react"

export function useMDXComponents(components: Record<string, React.ComponentType>) {
  return {
    ...getThemeComponents(),
    ...components
  }
}
