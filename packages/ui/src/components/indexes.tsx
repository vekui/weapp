import { cn } from "../lib/cn"
import { Box, Pressable, Text, type BoxProps } from "../primitives"

export type IndexesItem = {
  label: string
  value: string
}

export type IndexesSection = {
  key: string
  items: IndexesItem[]
  title: string
}

export type IndexesProps = BoxProps & {
  onSelect?: (value: string) => void
  sections?: IndexesSection[]
}

export function Indexes({ className, onSelect, sections = [], ...props }: IndexesProps) {
  return (
    <Box
      className={cn("relative overflow-hidden rounded-md border border-border bg-card text-card-foreground", className)}
      data-count={sections.length}
      data-state="default"
      {...props}
    >
      <Box className="pr-[56rpx]">
        {sections.map((section) => (
          <Box key={section.key} data-index-key={section.key}>
            <Text className="block bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {section.title}
            </Text>
            {section.items.map((item) => (
              <Pressable
                key={item.value}
                className="flex min-h-[88rpx] items-center border-b border-border px-3 last:border-b-0"
                data-state="item"
                onClick={() => onSelect?.(item.value)}
              >
                <Text className="text-sm text-foreground">{item.label}</Text>
              </Pressable>
            ))}
          </Box>
        ))}
      </Box>
      <Box className="absolute right-0 top-0 flex h-full w-[56rpx] flex-col items-center justify-center gap-1">
        {sections.map((section) => (
          <Text key={section.key} className="text-xs text-primary">
            {section.key}
          </Text>
        ))}
      </Box>
    </Box>
  )
}
