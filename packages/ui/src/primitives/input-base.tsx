import * as React from "react"
import { Input as TaroInput, Textarea as TaroTextarea } from "@tarojs/components"

export type InputBaseProps = React.ComponentProps<typeof TaroInput>
export type TextareaBaseProps = React.ComponentProps<typeof TaroTextarea>

export function InputBase({ className, ...props }: InputBaseProps) {
  return <TaroInput className={className} {...props} />
}

export function TextareaBase({ className, ...props }: TextareaBaseProps) {
  return <TaroTextarea className={className} {...props} />
}
