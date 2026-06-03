import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, type BoxProps, type PressableProps } from "../primitives"

export type AccordionItemState = "open" | "closed"

export function getAccordionItemState(
  itemValue: string,
  currentValue: string | undefined
): AccordionItemState {
  return itemValue === currentValue ? "open" : "closed"
}

type AccordionContextValue = {
  value?: string
  collapsible: boolean
  setValue: (value: string) => void
}

type AccordionItemContextValue = {
  value: string
  disabled?: boolean
}

const [AccordionProvider, useAccordionContext] =
  createStrictContext<AccordionContextValue>("Accordion")
const [AccordionItemProvider, useAccordionItemContext] =
  createStrictContext<AccordionItemContextValue>("AccordionItem")

export type AccordionRootProps = BoxProps & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  collapsible?: boolean
}

function AccordionRoot({
  className,
  value,
  defaultValue = "",
  onValueChange,
  collapsible = false,
  ...props
}: AccordionRootProps) {
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })

  return (
    <AccordionProvider
      value={{
        value: currentValue,
        collapsible,
        setValue: (nextValue) => {
          setCurrentValue(collapsible && currentValue === nextValue ? "" : nextValue)
        }
      }}
    >
      <Box className={cn("flex flex-col overflow-hidden rounded-md border border-border", className)} {...props} />
    </AccordionProvider>
  )
}

export type AccordionItemProps = BoxProps & {
  value: string
  disabled?: boolean
}

function AccordionItem({ className, value, disabled, ...props }: AccordionItemProps) {
  const accordion = useAccordionContext()
  const state = getAccordionItemState(value, accordion.value)

  return (
    <AccordionItemProvider value={{ value, disabled }}>
      <Box
        className={cn("border-b border-border last:border-b-0", className)}
        data-disabled={disabled ? "true" : undefined}
        data-state={state}
        {...props}
      />
    </AccordionItemProvider>
  )
}

export type AccordionTriggerProps = PressableProps

function AccordionTrigger({ className, onClick, ...props }: AccordionTriggerProps) {
  const accordion = useAccordionContext()
  const item = useAccordionItemContext()
  const state = getAccordionItemState(item.value, accordion.value)

  return (
    <Pressable
      className={cn(
        "flex min-h-[88rpx] flex-row items-center justify-between px-3 text-sm font-medium text-foreground",
        className
      )}
      data-state={state}
      disabled={item.disabled}
      onClick={(event) => {
        onClick?.(event)
        accordion.setValue(item.value)
      }}
      {...props}
    />
  )
}

export type AccordionContentProps = BoxProps

function AccordionContent({ className, ...props }: AccordionContentProps) {
  const accordion = useAccordionContext()
  const item = useAccordionItemContext()
  const state = getAccordionItemState(item.value, accordion.value)

  if (state === "closed") return null

  return (
    <Box
      className={cn("px-3 pb-3 text-sm leading-[40rpx] text-muted-foreground", className)}
      data-state={state}
      {...props}
    />
  )
}

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent
}
