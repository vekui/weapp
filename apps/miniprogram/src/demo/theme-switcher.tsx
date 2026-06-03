import { Box, Pressable, Text } from "@vekui/weapp"

import { demoThemes, type DemoThemeId } from "./theme-options"

type ThemeSwitcherProps = {
  onValueChange: (themeId: DemoThemeId) => void
  value: DemoThemeId
}

export function ThemeSwitcher({ onValueChange, value }: ThemeSwitcherProps) {
  return (
    <Box
      className="flex w-full flex-row gap-2 rounded-lg bg-secondary p-1 text-card-foreground"
      data-slot="demo-theme-switcher"
    >
      {demoThemes.map((theme) => {
        const selected = theme.id === value

        return (
          <Pressable
            key={theme.id}
            className={
              selected
                ? "flex min-h-[88rpx] flex-1 flex-row items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 shadow-sm"
                : "flex min-h-[88rpx] flex-1 flex-row items-center justify-center gap-2 rounded-md bg-card px-3 py-2"
            }
            aria-label={`切换到${theme.label}主题，${theme.description}`}
            data-state={selected ? "selected" : "default"}
            hoverClass={selected ? "bg-primary" : "bg-secondary"}
            onClick={() => onValueChange(theme.id)}
          >
            <Box className="flex flex-row items-center gap-1">
              {theme.swatches.map((swatch) => (
                <Box
                  key={swatch.name}
                  className={`h-[16rpx] w-[16rpx] rounded-full border border-border ${swatch.className}`}
                  data-slot="demo-theme-swatch"
                  aria-label={`${theme.label}${swatch.name}`}
                />
              ))}
            </Box>
            <Text
              className={
                selected
                  ? "block text-center text-xs font-semibold leading-[32rpx] text-primary-foreground"
                  : "block text-center text-xs font-medium leading-[32rpx] text-muted-foreground"
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
