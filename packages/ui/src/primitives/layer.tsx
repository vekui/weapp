import { cn } from "../lib/cn"
import { Box, type BoxProps } from "./box"
import { Pressable, type PressableProps } from "./pressable"

export type LayerState = "open" | "closed"
export type LayerSide = "center" | "bottom" | "top" | "left" | "right"

export function getLayerState(open: boolean): LayerState {
  return open ? "open" : "closed"
}

export function getLayerSideClass(side: LayerSide) {
  const classes: Record<LayerSide, string> = {
    center: "items-center justify-center p-4",
    bottom: "bottom-0 items-end justify-center",
    top: "top-0 items-start justify-center",
    left: "left-0 items-center justify-start",
    right: "right-0 items-center justify-end"
  }
  return classes[side]
}

export type LayerRootProps = BoxProps & {
  open?: boolean
  side?: LayerSide
}

function LayerRoot({ className, open = true, side = "center", ...props }: LayerRootProps) {
  if (!open) return null
  return (
    <Box
      className={cn("fixed inset-0 z-[900] flex", getLayerSideClass(side), className)}
      catchMove={true}
      data-side={side}
      data-state={getLayerState(open)}
      {...props}
    />
  )
}

export type LayerBackdropProps = PressableProps

function LayerBackdrop({ className, ...props }: LayerBackdropProps) {
  return (
    <Pressable
      className={cn("absolute inset-0 bg-foreground/40", className)}
      catchMove={true}
      data-slot="layer-backdrop"
      {...props}
    />
  )
}

export type LayerContentProps = BoxProps & {
  side?: LayerSide
}

function LayerContent({ className, side = "center", ...props }: LayerContentProps) {
  return (
    <Box
      className={cn(
        "relative z-[910] max-w-full bg-popover text-popover-foreground",
        side === "center" && "w-full rounded-lg border border-border",
        side === "bottom" &&
          "w-full rounded-t-lg border-t border-border pb-[env(safe-area-inset-bottom)]",
        side === "top" && "w-full rounded-b-lg border-b border-border",
        side === "left" && "h-full w-[80vw] border-r border-border",
        side === "right" && "h-full w-[80vw] border-l border-border",
        className
      )}
      data-side={side}
      data-slot="layer-content"
      {...props}
    />
  )
}

export const Layer = {
  Root: LayerRoot,
  Backdrop: LayerBackdrop,
  Content: LayerContent
}
