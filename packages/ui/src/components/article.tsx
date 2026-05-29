import { cn } from "../lib/cn"
import { Box, Text, type BoxProps, type TextProps } from "../primitives"

export type ArticleRootProps = BoxProps

function ArticleRoot({ className, ...props }: ArticleRootProps) {
  return (
    <Box
      className={cn("rounded-md bg-card p-4 text-card-foreground", className)}
      data-state="default"
      {...props}
    />
  )
}

export type ArticleTitleProps = TextProps

function ArticleTitle({ className, ...props }: ArticleTitleProps) {
  return <Text className={cn("block text-xl font-semibold text-foreground", className)} {...props} />
}

export type ArticleMetaProps = TextProps

function ArticleMeta({ className, ...props }: ArticleMetaProps) {
  return <Text className={cn("mt-1 block text-xs text-muted-foreground", className)} {...props} />
}

export type ArticleParagraphProps = TextProps

function ArticleParagraph({ className, ...props }: ArticleParagraphProps) {
  return <Text className={cn("mt-3 block text-sm leading-[48rpx] text-foreground", className)} {...props} />
}

export type ArticleSectionProps = BoxProps

function ArticleSection({ className, ...props }: ArticleSectionProps) {
  return <Box className={cn("mt-4 flex flex-col gap-2", className)} {...props} />
}

export const Article = {
  Root: ArticleRoot,
  Title: ArticleTitle,
  Meta: ArticleMeta,
  Paragraph: ArticleParagraph,
  Section: ArticleSection
}
