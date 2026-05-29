import * as React from "react"

import { cn } from "../lib/cn"
import { Box, Pressable, Text, type BoxProps } from "../primitives"
import { InputBase, type InputBaseProps } from "../primitives/input-base"

export type SearchBarProps = Omit<BoxProps, "children"> & {
  value?: string
  placeholder?: string
  prefix?: React.ReactNode
  clearText?: React.ReactNode
  inputProps?: Omit<InputBaseProps, "value" | "placeholder">
  onClear?: () => void
}

export function SearchBar({
  className,
  value,
  placeholder = "Search",
  prefix,
  clearText = "Clear",
  inputProps,
  onClear,
  ...props
}: SearchBarProps) {
  const empty = !value
  const { className: inputClassName, ...restInputProps } = inputProps ?? {}

  return (
    <Box
      className={cn(
        "flex min-h-[88rpx] flex-row items-center gap-2 rounded-md border border-input bg-background px-3",
        className
      )}
      data-empty={empty ? "" : undefined}
      {...props}
    >
      {prefix ? <Text className="text-muted-foreground">{prefix}</Text> : null}
      <InputBase
        className={cn("min-h-[88rpx] min-w-0 flex-1 text-base text-foreground", inputClassName)}
        confirmType="search"
        placeholder={placeholder}
        value={value}
        {...restInputProps}
      />
      {empty || !onClear ? null : (
        <Pressable
          className="flex min-h-[88rpx] min-w-[88rpx] shrink-0 items-center justify-center px-2"
          onClick={onClear}
        >
          <Text className="text-muted-foreground">{clearText}</Text>
        </Pressable>
      )}
    </Box>
  )
}
