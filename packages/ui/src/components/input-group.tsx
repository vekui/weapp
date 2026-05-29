import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"
import { InputBase, type InputBaseProps } from "../primitives/input-base"

export type InputGroupRootProps = BoxProps
export type InputGroupAddonProps = TextProps
export type InputGroupControlProps = BoxProps
export type InputGroupInputProps = InputBaseProps

function InputGroupRoot({ className, ...props }: InputGroupRootProps) {
  return (
    <Box
      className={cn(
        "flex min-h-[88rpx] flex-row items-center gap-2 rounded-md border border-input bg-background px-3",
        className
      )}
      {...props}
    />
  )
}

function InputGroupAddon({ className, ...props }: InputGroupAddonProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function InputGroupControl({ className, ...props }: InputGroupControlProps) {
  return <Box className={cn("min-w-0 flex-1", className)} {...props} />
}

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <InputBase
      className={cn(
        "min-h-[88rpx] w-full border-0 bg-transparent px-0 text-base text-foreground",
        className
      )}
      {...props}
    />
  )
}

export const InputGroup = {
  Root: InputGroupRoot,
  Addon: InputGroupAddon,
  Control: InputGroupControl,
  Input: InputGroupInput
}
