import { cn } from "../lib/cn"
import { Box, Text, type BoxProps } from "../primitives"

export type ChartTone = "primary" | "muted" | "destructive"
export type ChartType = "bar" | "line"

export type ChartDatum = {
  label: string
  value: number
}

export function getChartToneClass(tone: ChartTone = "primary") {
  const classes: Record<ChartTone, string> = {
    primary: "bg-primary",
    muted: "bg-muted",
    destructive: "bg-destructive"
  }
  return classes[tone]
}

export type ChartProps = BoxProps & {
  data?: ChartDatum[]
  tone?: ChartTone
  type?: ChartType
}

export function Chart({ className, data = [], tone = "primary", type = "bar", ...props }: ChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1)

  return (
    <Box
      className={cn("rounded-md border border-border bg-card p-4 text-card-foreground", className)}
      data-type={type}
      {...props}
    >
      <Box className="flex min-h-[160rpx] flex-row items-end gap-2">
        {data.map((item) => (
          <Box className="flex flex-1 flex-col items-center gap-2" key={item.label}>
            <Box
              className={cn("w-full rounded-sm", getChartToneClass(tone))}
              data-value={item.value}
              style={{ height: `${Math.max(8, Math.round((item.value / maxValue) * 120))}rpx` }}
            />
            <Text className="text-xs text-muted-foreground">{item.label}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
