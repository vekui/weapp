import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Pressable, Box, type PressableProps } from "../primitives"

export type SwitchProps = PressableProps & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  ...props
}: SwitchProps) {
  const [currentChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange
  })

  return (
    <Pressable
      className={cn(
        "flex h-[56rpx] w-[96rpx] flex-row items-center rounded-full p-[4rpx]",
        currentChecked ? "bg-primary" : "bg-muted",
        className
      )}
      data-state={currentChecked ? "checked" : "unchecked"}
      onClick={(event) => {
        props.onClick?.(event)
        setChecked(!currentChecked)
      }}
      {...props}
    >
      <Box
        className={cn(
          "size-[48rpx] rounded-full bg-background transition-[margin]",
          currentChecked && "ml-[40rpx]"
        )}
      />
    </Pressable>
  )
}
