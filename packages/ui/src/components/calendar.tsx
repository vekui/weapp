import * as React from "react"

import { cn } from "../lib/cn"
import { useControllableState } from "../lib/use-controllable-state"
import { Box, Pressable, Text, type BoxProps, type PressableProps } from "../primitives"

export type CalendarDay = {
  date: string
  day: number
  inMonth: boolean
}

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function pad(value: number) {
  return String(value).padStart(2, "0")
}

export function getCalendarMonthDays(month: string): CalendarDay[] {
  const parts = month.split("-").map(Number)
  const year = Number.isFinite(parts[0]) ? parts[0]! : 2026
  const monthNumber = Number.isFinite(parts[1]) ? parts[1]! : 5
  const firstDay = new Date(year, monthNumber - 1, 1)
  const startOffset = firstDay.getDay()
  const start = new Date(year, monthNumber - 1, 1 - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    const currentMonth = date.getMonth() + 1

    return {
      date: `${date.getFullYear()}-${pad(currentMonth)}-${pad(date.getDate())}`,
      day: date.getDate(),
      inMonth: currentMonth === monthNumber
    }
  })
}

export function getCalendarDayState(day: CalendarDay, value?: string) {
  if (day.date === value) return "selected"
  if (!day.inMonth) return "muted"
  return "default"
}

export type CalendarProps = BoxProps & {
  defaultValue?: string
  month?: string
  onValueChange?: (value: string) => void
  value?: string
}

export function Calendar({
  className,
  defaultValue = "",
  month = "2026-05",
  onValueChange,
  value,
  ...props
}: CalendarProps) {
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  })
  const days = React.useMemo(() => getCalendarMonthDays(month), [month])

  return (
    <Box
      className={cn("rounded-md border border-border bg-card p-3 text-card-foreground", className)}
      data-month={month}
      data-state={currentValue ? "selected" : "default"}
      {...props}
    >
      <Box className="grid grid-cols-7 gap-1">
        {weekdayLabels.map((label) => (
          <Text key={label} className="block text-center text-xs text-muted-foreground">
            {label}
          </Text>
        ))}
        {days.map((day) => {
          const state = getCalendarDayState(day, currentValue)
          return (
            <Pressable
              key={day.date}
              className={cn(
                "flex min-h-[72rpx] items-center justify-center rounded-md text-sm text-foreground",
                state === "selected" && "bg-primary text-primary-foreground",
                state === "muted" && "text-muted-foreground opacity-50"
              )}
              data-date={day.date}
              data-state={state}
              onClick={() => setCurrentValue(day.date)}
            >
              <Text>{day.day}</Text>
            </Pressable>
          )
        })}
      </Box>
    </Box>
  )
}

export type CalendarDayButtonProps = PressableProps
