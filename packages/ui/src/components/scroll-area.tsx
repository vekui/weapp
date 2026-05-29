import { ScrollView } from "@tarojs/components"
import * as React from "react"

import { cn } from "../lib/cn"

export type ScrollAreaProps = React.ComponentProps<typeof ScrollView>

export function ScrollArea({ className, scrollY = true, ...props }: ScrollAreaProps) {
  return (
    <ScrollView
      className={cn("overflow-hidden rounded-md bg-background text-foreground", className)}
      scrollY={scrollY}
      {...props}
    />
  )
}
