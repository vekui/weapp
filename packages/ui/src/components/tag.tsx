import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"
import { Pressable, type PressableProps } from "../primitives"

const tagVariants = cva(
  "inline-flex min-h-[56rpx] items-center justify-center rounded-full border px-3 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border bg-background text-foreground"
      },
      selected: {
        true: "border-primary bg-primary text-primary-foreground",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      selected: false
    }
  }
)

export type TagProps = PressableProps &
  VariantProps<typeof tagVariants> & {
    selected?: boolean
  }

export function Tag({ className, variant, selected, disabled, ...props }: TagProps) {
  return (
    <Pressable
      className={cn(tagVariants({ variant, selected }), className)}
      data-disabled={disabled ? "" : undefined}
      data-state={selected ? "selected" : "unselected"}
      disabled={disabled}
      {...props}
    />
  )
}
