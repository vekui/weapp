import Taro from "@tarojs/taro"
import { Box, Icon, List, ListItem, Text } from "@vekui/weapp"

import { getCategory, getCategoryComponents } from "../../demo/catalog"

export default function PanelPage() {
  const categoryId = String(Taro.getCurrentInstance().router?.params?.id ?? "basic")
  const category = getCategory(categoryId) ?? getCategory("basic")!
  const components = getCategoryComponents(category.id)

  return (
    <Box className="theme-learning min-h-screen bg-background">
      <Box className="bg-muted px-6 pb-8 pt-8">
        <Box className="flex flex-row items-center gap-4">
          <Box className="flex h-[88rpx] w-[88rpx] shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
            <Icon name={category.icon} tone="primary" />
          </Box>
          <Box className="min-w-0 flex-1">
            <Text className="block text-xl font-semibold leading-[56rpx] text-primary">{category.title}</Text>
            <Text className="mt-1 block text-xs leading-[32rpx] text-muted-foreground">
              {category.description} · {components.length} 个组件
            </Text>
          </Box>
        </Box>
      </Box>

      <Box className="px-6 py-3">
        <List className="border-0 bg-background">
          {components.map((component) => (
            <ListItem
              key={component.route}
              className="min-h-[112rpx] px-0 py-3"
              onClick={() => Taro.navigateTo({ url: `/${component.route}` })}
            >
              <Text className="text-base leading-[42rpx] text-foreground">{component.title}</Text>
              <Icon name="chevron-left" className="rotate-180" size="sm" tone="muted" />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
