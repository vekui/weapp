import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps, type TextProps } from "../primitives"
import { Layer } from "../primitives/layer"
import { Button } from "./button"

export type DialogState = "open" | "closed"

export function getDialogState(open: boolean): DialogState {
  return open ? "open" : "closed"
}

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [DialogProvider, useDialogContext] = createStrictContext<DialogContextValue>("Dialog")

export type DialogRootProps = BoxProps & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function DialogRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: DialogRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <DialogProvider value={{ open: currentOpen, setOpen }}>
      <Box className={className} data-state={getDialogState(currentOpen)} {...props} />
    </DialogProvider>
  )
}

export type DialogContentProps = BoxProps

function DialogContent({ className, children, ...props }: DialogContentProps) {
  const context = useDialogContext()
  if (!context.open) return null

  return (
    <Layer.Root side="center">
      <Layer.Backdrop onClick={() => context.setOpen(false)} />
      <Layer.Content className={cn("p-4", className)} side="center" {...props}>
        {children}
      </Layer.Content>
    </Layer.Root>
  )
}

export type DialogTitleProps = TextProps

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <Text className={cn("block text-lg font-semibold text-foreground", className)} {...props} />
}

export type DialogDescriptionProps = TextProps

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <Text className={cn("mt-1 block text-sm text-muted-foreground", className)} {...props} />
}

export type DialogCloseProps = PressableProps

function DialogClose({ className, onClick, ...props }: DialogCloseProps) {
  const context = useDialogContext()
  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-row items-center justify-center", className)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(false)
      }}
      {...props}
    />
  )
}

export type DialogProps = Omit<DialogRootProps, "children"> & {
  children?: React.ReactNode
  description?: React.ReactNode
  title: React.ReactNode
}

function DialogCompatCloseButton() {
  const context = useDialogContext()
  return (
    <Button size="sm" variant="secondary" onClick={() => context.setOpen(false)}>
      Close
    </Button>
  )
}

function DialogCompat({
  children,
  description,
  title,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: DialogProps) {
  return (
    <DialogRoot
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
      {...props}
    >
      <DialogContent className="p-5">
        <DialogTitle>{title}</DialogTitle>
        {description ? <DialogDescription>{description}</DialogDescription> : null}
        <Box className="mt-4 flex flex-col">{children}</Box>
        <Box className="mt-5 flex flex-row justify-end">
          <DialogCompatCloseButton />
        </Box>
      </DialogContent>
    </DialogRoot>
  )
}

export const Dialog = Object.assign(DialogCompat, {
  Root: DialogRoot,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose
})
