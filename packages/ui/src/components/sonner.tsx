import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type SonnerTone = "default" | "success" | "warning" | "destructive"
export type SonnerPosition = "top" | "bottom"

export function getSonnerToneClass(tone: SonnerTone = "default") {
  const classes: Record<SonnerTone, string> = {
    default: "border-border",
    success: "border-primary",
    warning: "border-secondary",
    destructive: "border-destructive"
  }
  return classes[tone]
}

export type SonnerToasterProps = BoxProps & {
  position?: SonnerPosition
}

function SonnerToaster({ className, position = "top", ...props }: SonnerToasterProps) {
  return (
    <Box
      className={cn(
        "fixed left-4 right-4 z-[950] flex flex-col gap-2",
        position === "bottom" ? "bottom-[32rpx]" : "top-[32rpx]",
        className
      )}
      data-position={position}
      {...props}
    />
  )
}

export type SonnerToastProps = BoxProps & {
  description?: React.ReactNode
  id?: string
  open?: boolean
  title?: React.ReactNode
  tone?: SonnerTone
}

function SonnerToast({
  className,
  description,
  id,
  open = true,
  title,
  tone = "default",
  ...props
}: SonnerToastProps) {
  if (!open) return null

  return (
    <Box
      className={cn(
        "rounded-md border bg-card px-4 py-3 text-card-foreground",
        getSonnerToneClass(tone),
        className
      )}
      data-state="open"
      data-toast-id={id}
      data-tone={tone}
      {...props}
    >
      {title ? <SonnerTitle>{title}</SonnerTitle> : null}
      {description ? <SonnerDescription>{description}</SonnerDescription> : null}
      {props.children}
    </Box>
  )
}

export type SonnerTitleProps = TextProps

function SonnerTitle({ className, ...props }: SonnerTitleProps) {
  return <Text className={cn("block text-sm font-medium text-foreground", className)} {...props} />
}

export type SonnerDescriptionProps = TextProps

function SonnerDescription({ className, ...props }: SonnerDescriptionProps) {
  return <Text className={cn("mt-1 block text-xs text-muted-foreground", className)} {...props} />
}

export const Sonner = {
  Toaster: SonnerToaster,
  Toast: SonnerToast,
  Title: SonnerTitle,
  Description: SonnerDescription
}
