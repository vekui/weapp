import { Image as TaroImage } from "@tarojs/components"
import * as React from "react"

import { cn } from "../lib/cn"

export type IconSize = "sm" | "default" | "lg"
export type LucideIconName =
  | "bell"
  | "book-open"
  | "calendar"
  | "check"
  | "chevron-left"
  | "clipboard-list"
  | "ellipsis"
  | "grid-2x2"
  | "home"
  | "image"
  | "info"
  | "layout-dashboard"
  | "loader-circle"
  | "minus"
  | "navigation"
  | "plus"
  | "star"
  | "user"
  | "x"
export type IconTone =
  | "foreground"
  | "muted"
  | "primary"
  | "primary-foreground"
  | "destructive"

const iconSizeClasses: Record<IconSize, string> = {
  sm: "h-[40rpx] w-[40rpx] text-sm",
  default: "h-[48rpx] w-[48rpx] text-base",
  lg: "h-[64rpx] w-[64rpx] text-lg"
}

const iconToneColors: Record<IconTone, string> = {
  foreground: "hsl(222 47% 11%)",
  muted: "hsl(215 16% 47%)",
  primary: "hsl(221 83% 53%)",
  "primary-foreground": "hsl(0 0% 100%)",
  destructive: "hsl(0 84% 60%)"
}

export const lucideIconPaths: Record<LucideIconName, string> = {
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  "book-open": '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  "chevron-left": '<path d="m15 18-6-6 6-6"/>',
  "clipboard-list": '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  ellipsis: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  "grid-2x2": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/><path d="M3 12h18"/>',
  home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v11h14V10"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  "layout-dashboard": '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  "loader-circle": '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
  minus: '<path d="M5 12h14"/>',
  navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
}

export function getLucideIconDataUri(
  name: LucideIconName,
  tone: IconTone = "foreground",
  filled = false
) {
  const color = iconToneColors[tone]
  const fill = filled ? color : "none"
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${fill}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${lucideIconPaths[name]}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

type IconImageProps = React.ComponentProps<typeof TaroImage>

export type IconProps = Omit<IconImageProps, "src"> & {
  filled?: boolean
  name: LucideIconName
  size?: IconSize
  tone?: IconTone
}

export function Icon({
  className,
  filled,
  mode = "aspectFit",
  name,
  size = "default",
  tone = "foreground",
  ...props
}: IconProps) {
  return (
    <TaroImage
      className={cn(
        "inline-block shrink-0",
        iconSizeClasses[size],
        className
      )}
      data-icon={name}
      data-size={size}
      mode={mode}
      src={getLucideIconDataUri(name, tone, filled)}
      {...props}
    />
  )
}
