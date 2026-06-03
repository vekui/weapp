import { cn } from "../lib/cn"
import { Pressable, type PressableProps } from "../primitives"

export type FabProps = PressableProps & {
  placement?: "bottom-right" | "bottom-left"
}

export function Fab({ className, placement = "bottom-right", disabled, ...props }: FabProps) {
  return (
    <Pressable
      className={cn(
        "fixed bottom-[calc(144rpx+env(safe-area-inset-bottom))] flex h-[104rpx] w-[104rpx] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm",
        placement === "bottom-right" ? "right-4" : "left-4",
        className
      )}
      aria-disabled={disabled ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      data-placement={placement}
      disabled={disabled}
      {...props}
    />
  )
}
