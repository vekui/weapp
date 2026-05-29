import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "ui-button inline-flex flex-row items-center justify-center gap-2 font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border bg-background text-foreground",
        ghost: "bg-transparent text-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        link: "bg-transparent text-primary"
      },
      size: {
        xs: "h-[56rpx] rounded-sm px-2 text-xs",
        sm: "h-[72rpx] rounded-md px-3 text-sm",
        default: "h-[88rpx] rounded-md px-4 text-sm",
        md: "h-[88rpx] rounded-md px-4 text-sm",
        lg: "h-[104rpx] rounded-md px-5 text-base",
        "icon-xs": "size-[56rpx] rounded-sm p-0 text-xs",
        "icon-sm": "size-[72rpx] rounded-md p-0 text-sm",
        icon: "size-[88rpx] rounded-md p-0 text-sm",
        "icon-lg": "size-[104rpx] rounded-md p-0 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
