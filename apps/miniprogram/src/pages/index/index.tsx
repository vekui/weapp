import Taro from "@tarojs/taro"
import { Box, Icon, Image, Pressable, Text } from "@vekui/weapp"

import { demoCategories, demoComponents, getCategoryComponents } from "../../demo/catalog"
import { demoRelease } from "../../demo/release"
import { enableDemoPageShare, useDemoPageShare } from "../../demo/share"
import { getDemoThemeClassName, useDemoTheme } from "../../demo/theme"
import { ThemeSwitcher } from "../../demo/theme-switcher"

const vekuiLogo = "/assets/brand/vekui-logo-horizontal-transparent.png"

export default function IndexPage() {
  const [themeId, setThemeId, activeTheme] = useDemoTheme()
  const totalDemoComponents = demoComponents.length
  useDemoPageShare()

  return (
    <Box className={`${getDemoThemeClassName(themeId)} min-h-screen bg-background pb-8`}>
      <Box
        className="flex flex-col items-center px-5 pb-[64rpx] pt-[44rpx]"
        data-slot="brand-hero"
      >
        <Image
          className="h-[140rpx] w-[380rpx] bg-transparent"
          data-slot="brand-logo"
          mode="aspectFit"
          rounded={false}
          src={vekuiLogo}
        />
        <Box
          className="mt-5 w-full rounded-lg border border-border bg-card px-4 py-4 text-card-foreground shadow-sm"
          data-slot="hero-summary"
        >
          <Box className="flex flex-row items-start justify-between gap-4">
            <Box className="min-w-0 flex-1">
              <Text className="block text-left text-xs font-medium leading-[30rpx] text-muted-foreground">
                组件覆盖
              </Text>
              <Box className="mt-1 flex flex-row items-end gap-2">
                <Text className="block text-left text-[44rpx] font-semibold leading-[52rpx] text-foreground">
                  {totalDemoComponents}
                </Text>
                <Text className="block pb-[6rpx] text-left text-xs font-medium leading-[28rpx] text-muted-foreground">
                  demos
                </Text>
              </Box>
            </Box>
            <Box
              className="shrink-0 rounded-md bg-secondary px-3 py-2"
              data-slot="demo-cache-version"
            >
              <Text className="block text-left text-xs font-medium leading-[28rpx] text-muted-foreground">
                缓存版本
              </Text>
              <Text className="mt-1 block text-left text-sm font-semibold leading-[34rpx] text-foreground">
                {demoRelease.version}
              </Text>
            </Box>
          </Box>
          <Text className="mt-3 block text-left text-xs leading-[32rpx] text-muted-foreground">
            {activeTheme.description}
          </Text>
          <Box className="mt-4 w-full">
            <ThemeSwitcher value={themeId} onValueChange={setThemeId} />
          </Box>
        </Box>
      </Box>

      <Box className="-mt-[28rpx] flex flex-col gap-4 px-5">
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
                  <Icon color={activeTheme.primaryColor} name={category.icon} size="sm" tone="primary" />
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

enableDemoPageShare(IndexPage)
