import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps, type TextProps } from "../primitives"
import { Layer } from "../primitives/layer"

type ModalContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const [ModalProvider, useModalContext] = createStrictContext<ModalContextValue>("Modal")

export type ModalRootProps = BoxProps & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

function ModalRoot({
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  ...props
}: ModalRootProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  return (
    <ModalProvider value={{ open: currentOpen, setOpen }}>
      <Box className={className} data-state={currentOpen ? "open" : "closed"} {...props} />
    </ModalProvider>
  )
}

export type ModalContentProps = BoxProps

function ModalContent({ className, children, ...props }: ModalContentProps) {
  const context = useModalContext()
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

export type ModalTitleProps = TextProps

function ModalTitle({ className, ...props }: ModalTitleProps) {
  return <Text className={cn("block text-lg font-semibold text-foreground", className)} {...props} />
}

export type ModalDescriptionProps = TextProps

function ModalDescription({ className, ...props }: ModalDescriptionProps) {
  return <Text className={cn("mt-1 block text-sm text-muted-foreground", className)} {...props} />
}

export type ModalActionProps = PressableProps

function ModalAction({ className, ...props }: ModalActionProps) {
  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-1 items-center justify-center rounded-md bg-primary px-3", className)}
      {...props}
    />
  )
}

function ModalClose({ className, onClick, ...props }: ModalActionProps) {
  const context = useModalContext()
  return (
    <Pressable
      className={cn("flex min-h-[88rpx] flex-1 items-center justify-center rounded-md bg-secondary px-3", className)}
      onClick={(event) => {
        onClick?.(event)
        context.setOpen(false)
      }}
      {...props}
    />
  )
}

export const Modal = {
  Root: ModalRoot,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Action: ModalAction,
  Close: ModalClose
}
