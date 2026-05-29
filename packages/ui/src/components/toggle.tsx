import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Pressable, type PressableProps } from "../primitives"

export type ToggleState = "on" | "off"

export function getToggleState(pressed: boolean): ToggleState {
  return pressed ? "on" : "off"
}

export type ToggleProps = PressableProps & {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

export function Toggle({
  className,
  pressed,
  defaultPressed = false,
  onPressedChange,
  disabled,
  onClick,
  ...props
}: ToggleProps) {
  const [currentPressed, setPressed] = useControllableState({
    value: pressed,
    defaultValue: defaultPressed,
    onChange: onPressedChange
  })

  return (
    <Pressable
      className={cn(
        "inline-flex min-h-[72rpx] min-w-[72rpx] items-center justify-center rounded-md px-3 text-sm text-foreground",
        currentPressed && "bg-primary text-primary-foreground",
        className
      )}
      data-disabled={disabled ? "" : undefined}
      data-state={getToggleState(currentPressed)}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event)
        setPressed(!currentPressed)
      }}
      {...props}
    />
  )
}
