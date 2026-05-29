import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type PressableProps } from "../primitives"
import { Icon } from "./icon"

export type CheckboxProps = PressableProps & {
  checked?: boolean
  defaultChecked?: boolean
  invalid?: boolean
  label?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
}

export function Checkbox({
  className,
  checked,
  defaultChecked = false,
  disabled,
  invalid,
  label,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const [currentChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange
  })

  return (
    <Pressable
      className={cn(
        label
          ? "flex min-h-[88rpx] flex-row items-center gap-2 py-2"
          : "flex size-[48rpx] items-center justify-center rounded border border-input",
        !label && currentChecked && "border-primary bg-primary",
        invalid && "border-destructive",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      data-state={currentChecked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={(event) => {
        props.onClick?.(event)
        setChecked(!currentChecked)
      }}
      {...props}
    >
      {label ? (
        <>
          <Box
            className={cn(
              "flex size-[48rpx] items-center justify-center rounded border border-input",
              currentChecked && "border-primary bg-primary",
              invalid && "border-destructive"
            )}
            data-state={currentChecked ? "checked" : "unchecked"}
          >
            {currentChecked ? <Icon name="check" size="sm" tone="primary-foreground" /> : null}
          </Box>
          <Text className="text-base text-foreground">{label}</Text>
        </>
      ) : currentChecked ? (
        <Icon name="check" size="sm" tone="primary-foreground" />
      ) : null}
    </Pressable>
  )
}
