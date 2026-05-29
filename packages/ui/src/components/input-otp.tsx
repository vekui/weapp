import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type OtpSlotState = "filled" | "empty"

export function getOtpSlotState(value: string | undefined, index: number): OtpSlotState {
  return value && value[index] ? "filled" : "empty"
}

export type InputOTPProps = BoxProps & {
  value?: string
  length?: number
}

export function InputOTP({ className, value = "", length = 6, ...props }: InputOTPProps) {
  return (
    <Box className={cn("flex flex-row items-center gap-1", className)} data-length={length} {...props}>
      {Array.from({ length }).map((_, index) => {
        const state = getOtpSlotState(value, index)
        return (
          <Box
            className={cn(
              "flex h-[72rpx] w-[64rpx] items-center justify-center rounded-md border border-input bg-background",
              state === "filled" && "border-primary"
            )}
            data-state={state}
            key={index}
          >
            <Text className="text-base font-medium text-foreground">{value[index] ?? ""}</Text>
          </Box>
        )
      })}
    </Box>
  )
}
