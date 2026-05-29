import Taro from "@tarojs/taro"
import { Box, Icon, Image, Pressable, Text } from "@vekui/weapp"

import { demoCategories, getCategoryComponents } from "../../demo/catalog"

const vekuiLogo = "/assets/brand/vekui-logo-horizontal-transparent.png"

export default function IndexPage() {
  return (
    <Box className="theme-learning min-h-screen bg-background pb-8">
      <Box
        className="flex flex-col items-center px-6 pb-[88rpx] pt-[44rpx]"
        data-slot="brand-hero"
      >
        <Image
          className="h-[140rpx] w-[380rpx] bg-transparent"
          data-slot="brand-logo"
          mode="aspectFit"
          rounded={false}
          src={vekuiLogo}
        />
      </Box>

      <Box className="-mt-[36rpx] flex flex-col gap-4 px-5">
        {demoCategories.map((category) => {
          const componentCount = getCategoryComponents(category.id).length

          return (
            <Pressable
              key={category.id}
              className="flex min-h-[148rpx] w-full flex-row items-center overflow-hidden rounded-lg border border-border bg-card px-5 py-4 text-card-foreground shadow-sm"
              data-state="category-card"
              hoverClass="bg-secondary"
              onClick={() => Taro.navigateTo({ url: `/pages/panel/index?id=${category.id}` })}
            >
              <Box className="flex w-full flex-row items-center gap-4">
                <Box className="flex h-[80rpx] w-[80rpx] shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <Icon name={category.icon} size="sm" tone="primary" />
                </Box>
                <Box className="min-w-0 flex-1 pr-2">
                  <Box className="flex flex-row items-center gap-2">
                    <Text className="block text-left text-base font-semibold leading-[42rpx] text-foreground">
                      {category.title}
                    </Text>
                    <Text className="rounded-full bg-secondary px-2 text-xs leading-[32rpx] text-muted-foreground">
                      {componentCount}
                    </Text>
                  </Box>
                  <Text className="mt-1 block text-left text-xs leading-[32rpx] text-muted-foreground">
                    {category.description}
                  </Text>
                </Box>
                <Box className="flex h-[68rpx] w-[68rpx] shrink-0 items-center justify-center rounded-full bg-primary">
                  <Icon name="chevron-left" className="rotate-180" size="sm" tone="primary-foreground" />
                </Box>
              </Box>
            </Pressable>
          )
        })}
      </Box>
    </Box>
  )
}
