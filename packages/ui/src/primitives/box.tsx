import * as React from "react"
import { View } from "@tarojs/components"

export type BoxProps = React.ComponentProps<typeof View>

export function Box({ className, ...props }: BoxProps) {
  return <View className={className} {...props} />
}
