import * as React from "react"
import { Text as TaroText } from "@tarojs/components"

export type TextProps = React.ComponentProps<typeof TaroText>

export function Text({ className, ...props }: TextProps) {
  return <TaroText className={className} {...props} />
}
