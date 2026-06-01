import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"

export type ResizableOrientation = "horizontal" | "vertical"

export function getResizableOrientation(orientation: ResizableOrientation = "horizontal") {
  return orientation
}

export type ResizablePanelGroupProps = BoxProps & {
  orientation?: ResizableOrientation
}

function ResizablePanelGroup({
  className,
  orientation = "horizontal",
  ...props
}: ResizablePanelGroupProps) {
  return (
    <Box
      className={cn(
        "flex overflow-hidden rounded-md border border-border",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      data-orientation={getResizableOrientation(orientation)}
      {...props}
    />
  )
}

export type ResizablePanelProps = BoxProps & {
  defaultSize?: number
  maxSize?: number
  minSize?: number
}

function ResizablePanel({
  className,
  defaultSize = 50,
  maxSize,
  minSize,
  style,
  ...props
}: ResizablePanelProps) {
  const panelStyle = typeof style === "object" && style !== null ? style : undefined

  return (
    <Box
      className={cn("min-w-0 bg-background p-3 text-foreground", className)}
      data-max-size={maxSize}
      data-min-size={minSize}
      data-size={defaultSize}
      style={{ flexBasis: `${defaultSize}%`, ...panelStyle }}
      {...props}
    />
  )
}

export type ResizableHandleProps = BoxProps

function ResizableHandle({ className, ...props }: ResizableHandleProps) {
  return <Box className={cn("min-h-[88rpx] w-[2rpx] bg-border", className)} data-role="resizable-handle" {...props} />
}

export const Resizable = {
  PanelGroup: ResizablePanelGroup,
  Panel: ResizablePanel,
  Handle: ResizableHandle
}
