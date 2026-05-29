import { cn } from "../lib/cn"
import { Text, type TextProps } from "../primitives"

export type CountdownProps = TextProps & {
  seconds?: number
}

function padTimePart(value: number) {
  return String(value).padStart(2, "0")
}

export function formatCountdown(seconds: number) {
  const total = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const remainingSeconds = total % 60
  return `${padTimePart(hours)}:${padTimePart(minutes)}:${padTimePart(remainingSeconds)}`
}

export function Countdown({ className, seconds = 0, children, ...props }: CountdownProps) {
  return (
    <Text
      className={cn("text-sm font-medium tabular-nums text-foreground", className)}
      data-seconds={seconds}
      {...props}
    >
      {children ?? formatCountdown(seconds)}
    </Text>
  )
}
