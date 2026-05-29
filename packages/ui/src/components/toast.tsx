import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type ToastVariant = "default" | "success" | "warning" | "destructive"

const toastVariants: Record<ToastVariant, string> = {
  default: "bg-foreground text-background",
  success: "bg-primary text-primary-foreground",
  warning: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground"
}

export type ToastProps = BoxProps & {
  description?: React.ReactNode
  open?: boolean
  title?: React.ReactNode
  tone?: ToastVariant
  variant?: ToastVariant
}

export function Toast({
  className,
  description,
  open,
  title,
  tone,
  variant = "default",
  ...props
}: ToastProps) {
  const visualVariant = tone ?? variant
  const isStructuredToast = title || description
  const currentOpen = open ?? Boolean(isStructuredToast)

  if (!currentOpen) return null

  return (
    <Box
      className={cn(
        "fixed left-4 right-4 top-[32rpx] z-[950] rounded-md px-4 py-3",
        isStructuredToast ? "border border-border bg-card text-card-foreground" : toastVariants[visualVariant],
        visualVariant === "success" && isStructuredToast ? "border-primary" : "",
        visualVariant === "destructive" && isStructuredToast ? "border-destructive text-destructive" : "",
        className
      )}
      data-state={isStructuredToast ? "open" : visualVariant}
      data-tone={visualVariant}
      {...props}
    >
      {isStructuredToast ? (
        <>
          {title ? <ToastTitle className="text-foreground">{title}</ToastTitle> : null}
          {description ? (
            <ToastDescription className="text-muted-foreground">{description}</ToastDescription>
          ) : null}
        </>
      ) : (
        props.children
      )}
    </Box>
  )
}

export type ToastTitleProps = TextProps

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <Text className={cn("block text-sm font-medium", className)} {...props} />
}

export type ToastDescriptionProps = TextProps

export function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return <Text className={cn("mt-1 block text-xs opacity-80", className)} {...props} />
}

export function ToastViewport({ className, ...props }: BoxProps) {
  return (
    <Box className={cn("fixed left-4 right-4 top-[32rpx] z-[950] flex flex-col gap-2", className)} {...props} />
  )
}
