import * as React from "react"
import { Swiper, SwiperItem } from "@tarojs/components"

import { cn } from "../lib/cn"

export type CarouselProps = React.ComponentProps<typeof Swiper>

function CarouselRoot({
  className,
  indicatorDots = true,
  circular = true,
  ...props
}: CarouselProps) {
  return (
    <Swiper
      className={cn("h-[320rpx] overflow-hidden rounded-md bg-muted", className)}
      circular={circular}
      data-state="ready"
      indicatorDots={indicatorDots}
      {...props}
    />
  )
}

export type CarouselItemProps = React.ComponentProps<typeof SwiperItem>

function CarouselItem({ className, ...props }: CarouselItemProps) {
  return <SwiperItem className={cn("h-full", className)} data-state="default" {...props} />
}

export const Carousel = {
  Root: CarouselRoot,
  Item: CarouselItem
}
