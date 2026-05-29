import { cn } from "../lib/cn"
import { TextareaBase, type TextareaBaseProps } from "../primitives"

export type TextareaProps = TextareaBaseProps & {
  invalid?: boolean
}

export function Textarea({ className, disabled, invalid, ...props }: TextareaProps) {
  return (
    <TextareaBase
      className={cn(
        "box-border min-h-[176rpx] w-full rounded-md border border-input bg-background px-3 py-2 text-base leading-[40rpx] text-foreground",
        invalid && "border-destructive",
        className
      )}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      disabled={disabled}
      {...props}
    />
  )
}
