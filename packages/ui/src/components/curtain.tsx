import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps, type TextProps } from "../primitives"
import { Layer } from "../primitives/layer"

export type CurtainProps = BoxProps & {
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export function Curtain({
  className,
  defaultOpen = false,
  onOpenChange,
  open,
  children,
  ...props
}: CurtainProps) {
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  })

  if (!currentOpen) return null

  return (
    <Layer.Root side="center">
      <Layer.Backdrop onClick={() => setOpen(false)} />
      <Layer.Content
        className={cn("mx-4 rounded-lg border border-border bg-card p-4 text-card-foreground", className)}
        data-state="open"
        side="center"
        {...props}
      >
        {children}
      </Layer.Content>
    </Layer.Root>
  )
}

export type CurtainTitleProps = TextProps

export function CurtainTitle({ className, ...props }: CurtainTitleProps) {
  return <Text className={cn("block text-lg font-semibold text-foreground", className)} {...props} />
}

export type CurtainCloseProps = PressableProps & {
  onClose?: () => void
}

export function CurtainClose({ className, onClick, onClose, ...props }: CurtainCloseProps) {
  return (
    <Pressable
      className={cn("mt-3 flex min-h-[88rpx] items-center justify-center rounded-md bg-secondary px-3", className)}
      onClick={(event) => {
        onClick?.(event)
        onClose?.()
      }}
      {...props}
    />
  )
}
