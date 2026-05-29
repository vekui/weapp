import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"
import { Text, type TextProps } from "../primitives"

const badgeVariants = cva(
  "inline-flex min-h-[40rpx] items-center rounded-full px-2 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border bg-background text-foreground",
        destructive: "bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export type BadgeProps = TextProps & VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <Text className={cn(badgeVariants({ variant }), className)} {...props} />
}
