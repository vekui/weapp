import { Box, Pressable, Text } from "@vekui/weapp"

import { demoThemes, type DemoThemeId } from "./theme"

type ThemeSwitcherProps = {
  onValueChange: (themeId: DemoThemeId) => void
  value: DemoThemeId
}

export function ThemeSwitcher({ onValueChange, value }: ThemeSwitcherProps) {
  return (
    <Box
      className="flex w-full flex-row gap-2 rounded-lg border border-border bg-card p-1 text-card-foreground"
      data-slot="demo-theme-switcher"
    >
      {demoThemes.map((theme) => {
        const selected = theme.id === value

        return (
          <Pressable
            key={theme.id}
            className={
              selected
                ? "flex min-h-[88rpx] flex-1 items-center justify-center rounded-md bg-primary px-3"
                : "flex min-h-[88rpx] flex-1 items-center justify-center rounded-md bg-background px-3"
            }
            data-state={selected ? "selected" : "default"}
            hoverClass={selected ? "bg-primary" : "bg-secondary"}
            onClick={() => onValueChange(theme.id)}
          >
            <Text
              className={
                selected
                  ? "text-center text-sm font-medium leading-[36rpx] text-primary-foreground"
                  : "text-center text-sm font-medium leading-[36rpx] text-muted-foreground"
              }
            >
              {theme.label}
            </Text>
          </Pressable>
        )
      })}
    </Box>
  )
}
