import { cn } from "../lib/cn"
import { createStrictContext } from "../lib/create-strict-context"
import { Box, Text, type BoxProps } from "../primitives"

export type StepState = "wait" | "process" | "finish" | "error"

export function getStepState(index: number, current: number, status?: StepState): StepState {
  if (status) return status
  if (index < current) return "finish"
  if (index === current) return "process"
  return "wait"
}

type StepsContextValue = {
  current: number
}

const [StepsProvider, useStepsContext] = createStrictContext<StepsContextValue>("Steps")

export type StepsRootProps = BoxProps & {
  current?: number
}

function StepsRoot({ className, current = 0, ...props }: StepsRootProps) {
  return (
    <StepsProvider value={{ current }}>
      <Box className={cn("flex flex-col", className)} {...props} />
    </StepsProvider>
  )
}

export type StepsItemProps = BoxProps & {
  index: number
  title?: string
  description?: string
  status?: StepState
  last?: boolean
}

function StepsItem({
  className,
  index,
  title,
  description,
  status,
  last,
  children,
  ...props
}: StepsItemProps) {
  const context = useStepsContext()
  const state = getStepState(index, context.current, status)

  return (
    <Box
      className={cn("flex min-h-[88rpx] flex-row gap-3 text-foreground", className)}
      data-last={last ? "" : undefined}
      data-state={state}
      {...props}
    >
      <Box className="flex min-h-[88rpx] w-[48rpx] flex-col items-center" data-slot="steps-rail">
        <Box
          className={cn(
            "flex h-[48rpx] w-[48rpx] items-center justify-center rounded-full border border-border text-xs",
            state === "process" && "border-primary bg-primary text-primary-foreground",
            state === "finish" && "border-primary bg-primary text-primary-foreground",
            state === "error" && "border-destructive bg-destructive text-destructive-foreground",
            state === "wait" && "bg-background text-muted-foreground"
          )}
          data-slot="steps-dot"
        >
          {index + 1}
        </Box>
        <Box
          className={cn("w-px flex-1 bg-border", last ? "hidden" : "block")}
          data-slot="steps-line"
        />
      </Box>
      <Box className="flex flex-1 flex-col gap-1">
        {title ? <Text className="text-sm font-medium text-foreground">{title}</Text> : null}
        {description ? (
          <Text className="text-xs leading-[36rpx] text-muted-foreground">{description}</Text>
        ) : null}
        {children}
      </Box>
    </Box>
  )
}

export const Steps = {
  Root: StepsRoot,
  Item: StepsItem
}
