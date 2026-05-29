import * as React from "react"
import { Image as TaroImage } from "@tarojs/components"

import { cn } from "../lib/cn"
import { Box, Pressable, Text, type BoxProps } from "../primitives"

export type ImagePickerFile = {
  id: string
  url: string
}

export type ImagePickerProps = BoxProps & {
  files?: ImagePickerFile[]
  maxCount?: number
  onAdd?: () => void
  onRemove?: (file: ImagePickerFile) => void
}

export function ImagePicker({
  className,
  files = [],
  maxCount = 9,
  onAdd,
  onRemove,
  ...props
}: ImagePickerProps) {
  const canAdd = files.length < maxCount

  return (
    <Box
      className={cn("grid grid-cols-3 gap-2", className)}
      data-count={files.length}
      data-state={canAdd ? "default" : "full"}
      {...props}
    >
      {files.map((file) => (
        <Pressable
          key={file.id}
          className="relative h-[160rpx] overflow-hidden rounded-md border border-border bg-muted"
          data-state="file"
          onClick={() => onRemove?.(file)}
        >
          <TaroImage className="h-full w-full" mode="aspectFill" src={file.url} />
        </Pressable>
      ))}
      {canAdd ? (
        <Pressable
          className="flex h-[160rpx] items-center justify-center rounded-md border border-dashed border-border bg-muted"
          data-state="add"
          onClick={onAdd}
        >
          <Text className="text-2xl text-muted-foreground">+</Text>
        </Pressable>
      ) : null}
    </Box>
  )
}
