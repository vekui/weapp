import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

const alertVariants = cva("flex flex-col gap-1 rounded-md border p-4", {
  variants: {
    variant: {
      default: "border-border bg-card text-card-foreground",
      destructive: "border-destructive bg-background text-destructive"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export type AlertRootProps = BoxProps & VariantProps<typeof alertVariants>
export type AlertTitleProps = BoxProps
export type AlertDescriptionProps = BoxProps

function AlertRoot({ className, variant, ...props }: AlertRootProps) {
  return <Box className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <Box className={cn("text-base font-semibold text-foreground", className)} {...props} />
}

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <Box className={cn("text-sm leading-[40rpx] text-muted-foreground", className)} {...props} />
  )
}

export const Alert = {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription
}
