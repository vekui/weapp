import * as React from "react"
import Taro from "@tarojs/taro"
import { setIconToneColor } from "@vekui/weapp"

import { demoThemes, type DemoThemeId } from "./theme-options"

const demoThemeStorageKey = "vekui-demo-theme"

export const defaultDemoThemeId: DemoThemeId = "learning"

function isDemoThemeId(value: unknown): value is DemoThemeId {
  return demoThemes.some((theme) => theme.id === value)
}

function readStoredThemeId(): DemoThemeId {
  try {
    const storedThemeId = Taro.getStorageSync<string>(demoThemeStorageKey)

    if (isDemoThemeId(storedThemeId)) {
      return storedThemeId
    }
  } catch {
    // Storage can be unavailable in tests, builds, or constrained runtimes.
  }

  return defaultDemoThemeId
}

function writeStoredThemeId(themeId: DemoThemeId) {
  try {
    Taro.setStorageSync(demoThemeStorageKey, themeId)
  } catch {
    // Theme switching should continue even when persistence is unavailable.
  }
}

export function getDemoTheme(themeId: DemoThemeId) {
  return demoThemes.find((theme) => theme.id === themeId) ?? demoThemes[0]
}

export function getDemoThemeClassName(themeId: DemoThemeId) {
  return getDemoTheme(themeId).className
}

export function useDemoTheme() {
  const [themeId, setThemeId] = React.useState<DemoThemeId>(readStoredThemeId)
  const activeTheme = getDemoTheme(themeId)

  for (const [tone, color] of Object.entries(activeTheme.iconColors)) {
    setIconToneColor(tone as keyof typeof activeTheme.iconColors, color)
  }

  Taro.useDidShow(() => {
    setThemeId(readStoredThemeId())
  })

  const updateThemeId = React.useCallback((nextThemeId: DemoThemeId) => {
    setThemeId(nextThemeId)
    writeStoredThemeId(nextThemeId)
  }, [])

  return [themeId, updateThemeId, activeTheme] as const
}
