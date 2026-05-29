import { cva } from "class-variance-authority"

export const controlBase =
  "min-h-[88rpx] rounded-md border border-input bg-background px-4 py-2 text-base text-foreground"

export const focusRing =
  "data-[invalid=true]:border-destructive data-[invalid=true]:text-destructive"

export const controlButtonVariants = cva(
  "inline-flex min-h-[88rpx] items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-colors data-[disabled=true]:opacity-50 data-[loading=true]:opacity-70",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border bg-background text-foreground",
        ghost: "bg-transparent text-foreground",
        destructive: "bg-destructive text-destructive-foreground"
      },
      size: {
        sm: "min-h-[72rpx] px-3 text-sm",
        md: "min-h-[88rpx] px-4 text-base",
        lg: "min-h-[104rpx] px-5 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)
