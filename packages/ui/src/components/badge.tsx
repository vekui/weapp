import * as React from "react"
import { Text } from "@tarojs/components"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/cn"

const badgeVariants = cva(
  "inline-flex min-h-[40rpx] items-center rounded-md px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        destructive: "bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.ComponentProps<typeof Text>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <Text className={cn(badgeVariants({ variant }), className)} {...props} />
}
