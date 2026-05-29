import type { LucideIconName } from "@vekui/weapp"

export type DemoCategoryId =
  | "basic"
  | "view"
  | "action"
  | "form"
  | "layout"
  | "navigation"
  | "advanced"

export type DemoCategory = {
  description: string
  icon: LucideIconName
  id: DemoCategoryId
  title: string
}

export type DemoComponent = {
  category: DemoCategoryId
  route: string
  slug: string
  title: string
}

export const demoCategories: DemoCategory[] = [
  { id: "basic", title: "基础", description: "包含颜色、文本、图标等", icon: "grid-2x2" },
  { id: "view", title: "视图", description: "包含通告栏、标签、徽标等", icon: "image" },
  { id: "action", title: "操作反馈", description: "包含对话框、进度条、动作面板等", icon: "bell" },
  { id: "form", title: "表单", description: "包含输入框、单选框、复选框等", icon: "clipboard-list" },
  { id: "layout", title: "布局", description: "包含列表、浮层、卡片等", icon: "layout-dashboard" },
  { id: "navigation", title: "导航", description: "包含标签栏、导航栏、分段器等", icon: "navigation" },
  { id: "advanced", title: "高阶组件", description: "包含日历等", icon: "calendar" }
]

export const demoComponents: DemoComponent[] = [
  { category: "basic", slug: "color", title: "Color 颜色", route: "pages/basic/color/index" },
  { category: "basic", slug: "icon", title: "Icon 图标", route: "pages/basic/icon/index" },
  { category: "basic", slug: "typo", title: "Typography 字体", route: "pages/basic/typo/index" },
  { category: "basic", slug: "button", title: "Button 按钮", route: "pages/basic/button/index" },
  { category: "view", slug: "avatar", title: "Avatar 头像", route: "pages/view/avatar/index" },
  { category: "view", slug: "article", title: "Article 文章", route: "pages/view/article/index" },
  { category: "view", slug: "badge", title: "Badge 徽标", route: "pages/view/badge/index" },
  { category: "view", slug: "countdown", title: "CountDown 倒计时", route: "pages/view/countdown/index" },
  { category: "view", slug: "curtain", title: "Curtain 幕帘", route: "pages/view/curtain/index" },
  { category: "view", slug: "divider", title: "Divider 分割线", route: "pages/view/divider/index" },
  { category: "view", slug: "noticebar", title: "NoticeBar 通告栏", route: "pages/view/noticebar/index" },
  { category: "view", slug: "tag", title: "Tag 标签", route: "pages/view/tag/index" },
  { category: "view", slug: "timeline", title: "Timeline 时间轴", route: "pages/view/timeline/index" },
  { category: "view", slug: "swiper", title: "Swiper 滑块视图容器", route: "pages/view/swiper/index" },
  { category: "view", slug: "load-more", title: "Load-More 页面提示", route: "pages/view/load-more/index" },
  { category: "view", slug: "steps", title: "Steps 步骤条", route: "pages/view/steps/index" },
  { category: "action", slug: "action-sheet", title: "Action-Sheet 动作面板", route: "pages/action/action-sheet/index" },
  { category: "action", slug: "activity-indicator", title: "Activity-Indicator 活动指示器", route: "pages/action/activity-indicator/index" },
  { category: "action", slug: "modal", title: "Modal 模态框", route: "pages/action/modal/index" },
  { category: "action", slug: "progress", title: "Progress 进度条", route: "pages/action/progress/index" },
  { category: "action", slug: "toast", title: "Toast 轻提示", route: "pages/action/toast/index" },
  { category: "action", slug: "swipe-action", title: "Swipe-Action 滑动操作", route: "pages/action/swipe-action/index" },
  { category: "action", slug: "message", title: "Message 消息通知", route: "pages/action/message/index" },
  { category: "form", slug: "form", title: "Form 表单", route: "pages/form/form/index" },
  { category: "form", slug: "input", title: "Input 输入框", route: "pages/form/input/index" },
  { category: "form", slug: "radio", title: "Radio 单选框", route: "pages/form/radio/index" },
  { category: "form", slug: "checkbox", title: "Checkbox 复选框", route: "pages/form/checkbox/index" },
  { category: "form", slug: "switch", title: "Switch 开关", route: "pages/form/switch/index" },
  { category: "form", slug: "rate", title: "Rate 评分", route: "pages/form/rate/index" },
  { category: "form", slug: "input-number", title: "Input-Number 数字输入框", route: "pages/form/input-number/index" },
  { category: "form", slug: "textarea", title: "Textarea 多行文本框", route: "pages/form/textarea/index" },
  { category: "form", slug: "picker", title: "Picker 选择器", route: "pages/form/picker/index" },
  { category: "form", slug: "picker-view", title: "Picker-View 滚动选择器", route: "pages/form/picker-view/index" },
  { category: "form", slug: "slider", title: "Slider 滑动条", route: "pages/form/slider/index" },
  { category: "form", slug: "search-bar", title: "Search-Bar 搜索栏", route: "pages/form/search-bar/index" },
  { category: "form", slug: "image-picker", title: "Image-Picker 图片选择器", route: "pages/form/image-picker/index" },
  { category: "form", slug: "range", title: "Range 范围选择器", route: "pages/form/range/index" },
  { category: "layout", slug: "flex", title: "Flex 弹性布局", route: "pages/layout/flex/index" },
  { category: "layout", slug: "grid", title: "Grid 栅格", route: "pages/layout/grid/index" },
  { category: "layout", slug: "list", title: "List 列表", route: "pages/layout/list/index" },
  { category: "layout", slug: "card", title: "Card 卡片", route: "pages/layout/card/index" },
  { category: "layout", slug: "float-layout", title: "Float-Layout 浮动弹层", route: "pages/layout/float-layout/index" },
  { category: "layout", slug: "accordion", title: "Accordion 手风琴", route: "pages/layout/accordion/index" },
  { category: "navigation", slug: "navbar", title: "NavBar 导航栏", route: "pages/navigation/navbar/index" },
  { category: "navigation", slug: "tabbar", title: "TabBar 标签栏", route: "pages/navigation/tabbar/index" },
  { category: "navigation", slug: "tabs", title: "Tabs 标签页", route: "pages/navigation/tabs/index" },
  { category: "navigation", slug: "segmented-control", title: "Segmented-Control 分段器", route: "pages/navigation/segmented-control/index" },
  { category: "navigation", slug: "pagination", title: "Pagination 分页器", route: "pages/navigation/pagination/index" },
  { category: "navigation", slug: "drawer", title: "Drawer 抽屉", route: "pages/navigation/drawer/index" },
  { category: "navigation", slug: "indexes", title: "Indexes 索引选择器", route: "pages/navigation/indexes/index" },
  { category: "advanced", slug: "calendar", title: "Calendar 日历", route: "pages/advanced/calendar/index" }
]

export const demoAppPages = [
  "pages/index/index",
  "pages/panel/index",
  "pages/dev/ui/index",
  ...demoComponents
    .filter((component) => component.category === "basic" || component.category === "advanced")
    .map((component) => component.route)
]

export const demoSubpackages = [
  {
    root: "pages/form",
    pages: demoComponents
      .filter((component) => component.category === "form")
      .map((component) => component.route.replace("pages/form/", ""))
  },
  {
    root: "pages/view",
    pages: demoComponents
      .filter((component) => component.category === "view")
      .map((component) => component.route.replace("pages/view/", ""))
  },
  {
    root: "pages/navigation",
    pages: demoComponents
      .filter((component) => component.category === "navigation")
      .map((component) => component.route.replace("pages/navigation/", ""))
  },
  {
    root: "pages/action",
    pages: demoComponents
      .filter((component) => component.category === "action")
      .map((component) => component.route.replace("pages/action/", ""))
  },
  {
    root: "pages/layout",
    pages: demoComponents
      .filter((component) => component.category === "layout")
      .map((component) => component.route.replace("pages/layout/", ""))
  }
]

export function getCategory(id: string) {
  return demoCategories.find((category) => category.id === id)
}

export function getCategoryComponents(id: string) {
  return demoComponents.filter((component) => component.category === id)
}

export function getDemoComponent(slug: string) {
  return demoComponents.find((component) => component.slug === slug)
}
