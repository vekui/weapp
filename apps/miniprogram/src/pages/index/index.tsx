import Taro from "@tarojs/taro"
import { Text, View } from "@tarojs/components"
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@vekui/weapp"

const components = [
  ["button", "Button", "按钮、加载态、openType"],
  ["card", "Card", "内容容器"],
  ["badge", "Badge", "状态标签"],
  ["field", "Field", "表单字段"],
  ["input", "Input", "单行输入"],
  ["textarea", "Textarea", "多行输入"],
  ["checkbox", "Checkbox", "复选项"],
  ["radio-group", "RadioGroup", "单选组"],
  ["switch", "Switch", "开关"],
  ["tabs", "Tabs", "标签页"],
  ["dialog", "Dialog", "无 portal 弹层"],
  ["toast", "Toast", "轻提示"]
] as const

export default function IndexPage() {
  return (
    <View className="vekui-theme min-h-screen bg-background p-4 text-foreground">
      <View className="mb-5 gap-2">
        <Badge variant="secondary">v0 registry-first</Badge>
        <Text className="text-2xl font-semibold text-foreground">VekUI WeApp</Text>
        <Text className="text-sm text-muted-foreground">
          Taro React 微信小程序组件 playground
        </Text>
      </View>

      <View className="gap-3">
        {components.map(([slug, title, description]) => (
          <Card key={slug}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="sm"
                variant="outline"
                onClick={() => Taro.navigateTo({ url: `/pages/component/index?name=${slug}` })}
              >
                查看组件
              </Button>
            </CardContent>
          </Card>
        ))}
      </View>
    </View>
  )
}
