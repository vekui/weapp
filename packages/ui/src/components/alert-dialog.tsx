import * as React from "react"

import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"
import { Layer } from "../primitives/layer"
import { Button, type ButtonProps } from "./button"

export type AlertDialogState = "open" | "closed"

export function getAlertDialogState(open: boolean): AlertDialogState {
  return open ? "open" : "closed"
}

type AlertDialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [AlertDialogProvider, useAlertDialogContext] =
  createStrictContext<AlertDialogContextValue>("AlertDialog")

export type AlertDialogRootProps = BoxProps & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function AlertDialogRoot({
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  ...props
}: AlertDialogRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <AlertDialogProvider value={{ open: currentOpen, setOpen }}>
      <Box className={className} data-state={getAlertDialogState(currentOpen)} {...props} />
    </AlertDialogProvider>
  )
}

export type AlertDialogContentProps = BoxProps

function AlertDialogContent({ className, children, ...props }: AlertDialogContentProps) {
  const context = useAlertDialogContext()
  if (!context.open) return null

  return (
    <Layer.Root side="center">
      <Layer.Backdrop onClick={() => context.setOpen(false)} />
      <Layer.Content className={cn("p-5", className)} side="center" {...props}>
        {children}
      </Layer.Content>
    </Layer.Root>
  )
}

export type AlertDialogHeaderProps = BoxProps

function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <Box className={cn("flex flex-col gap-1", className)} {...props} />
}

export type AlertDialogFooterProps = BoxProps

function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <Box className={cn("mt-5 flex flex-row justify-end gap-2", className)} {...props} />
}

export type AlertDialogTitleProps = TextProps

function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <Text className={cn("block text-lg font-semibold text-foreground", className)} {...props} />
}

export type AlertDialogDescriptionProps = TextProps

function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <Text className={cn("block text-sm text-muted-foreground", className)} {...props} />
}

export type AlertDialogActionProps = ButtonProps

function AlertDialogAction({ className, onClick, ...props }: AlertDialogActionProps) {
  const context = useAlertDialogContext()
  return (
    <Button
      className={cn("min-h-[88rpx]", className)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(false)
      }}
      {...props}
    />
  )
}

export type AlertDialogCancelProps = ButtonProps

function AlertDialogCancel({ className, onClick, variant = "secondary", ...props }: AlertDialogCancelProps) {
  const context = useAlertDialogContext()
  return (
    <Button
      className={cn("min-h-[88rpx]", className)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(false)
      }}
      variant={variant}
      {...props}
    />
  )
}

export type AlertDialogProps = Omit<AlertDialogRootProps, "children"> & {
  actionText?: React.ReactNode
  cancelText?: React.ReactNode
  children?: React.ReactNode
  description?: React.ReactNode
  onAction?: () => void
  title: React.ReactNode
}

function AlertDialogCompat({
  actionText = "Continue",
  cancelText = "Cancel",
  children,
  description,
  onAction,
  title,
  ...props
}: AlertDialogProps) {
  return (
    <AlertDialogRoot {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>
        {children ? <Box className="mt-4 flex flex-col">{children}</Box> : null}
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}

export const AlertDialog = Object.assign(AlertDialogCompat, {
  Root: AlertDialogRoot,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel
})
