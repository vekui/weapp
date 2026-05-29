export type ComponentStatus = "available" | "planned"
export type SectionId =
  | "introduction"
  | "components"
  | "installation"
  | "theming"
  | "cli"
  | "rtl"
  | "skills"
  | "mcp-server"
  | "registry"
  | "forms"
  | "changelog"

export type SectionItem = {
  description: string
  id: SectionId
  title: string
}

export type ComponentCatalogItem = {
  command?: string
  dependency?: string
  description: string
  exportName: string
  name: string
  registryPath?: string
  roadmap?: string
  slug: string
  source?: string
  state?: string
  status: ComponentStatus
  taroNote: string
}

export const sectionItems: SectionItem[] = [
  {
    id: "introduction",
    title: "Introduction",
    description: "VekUI 的定位、源码分发模型和 Taro 小程序边界。"
  },
  {
    id: "components",
    title: "Components",
    description: "按 shadcn 官网顺序整理的组件索引，区分 v0 可用和路线图规划。"
  },
  {
    id: "installation",
    title: "Installation",
    description: "从空 Taro React 小程序项目初始化 VekUI。"
  },
  {
    id: "theming",
    title: "Theming",
    description: "语义 token、Tailwind 入口和小程序安全 utility 规则。"
  },
  {
    id: "cli",
    title: "CLI",
    description: "init、add、list、doctor 的使用路径。"
  },
  {
    id: "rtl",
    title: "RTL",
    description: "多方向布局在小程序端的支持边界。"
  },
  {
    id: "skills",
    title: "Skills",
    description: "面向 AI Coding 的规则入口和组件扩展约束。"
  },
  {
    id: "mcp-server",
    title: "MCP Server",
    description: "后续提供给 agent 消费 registry 的集成方向。"
  },
  {
    id: "registry",
    title: "Registry",
    description: "shadcn-compatible registry JSON 与 public contract。"
  },
  {
    id: "forms",
    title: "Forms",
    description: "Field、Input、Textarea、Checkbox、Radio Group 和 Switch 的组合路线。"
  },
  {
    id: "changelog",
    title: "Changelog",
    description: "当前 v0 状态和接下来补齐的组件方向。"
  }
]

const availableBySlug: Record<
  string,
  Omit<ComponentCatalogItem, "name" | "slug" | "status"> & { name?: string }
> = {
  badge: {
    command: "pnpm dlx vekui add badge --cwd .",
    dependency: "utils",
    description: "轻量状态标签，使用语义 variant 表达 tone。",
    exportName: "Badge",
    registryPath: "/weapp/r/badge.json",
    source: "packages/ui/src/components/badge.tsx",
    state: "variant",
    taroNote: "使用 Taro Text 承载标签内容，不依赖 Web span 或 DOM 样式回退。"
  },
  button: {
    command: "pnpm dlx vekui add button --cwd .",
    dependency: "utils, button-variants",
    description: "Taro Button wrapper，提供 token variants、size 和 loading 状态。",
    exportName: "Button",
    registryPath: "/weapp/r/button.json",
    source: "packages/ui/src/components/button.tsx",
    state: "data-loading",
    taroNote: "保留原生 Button 语义，同时用 token class 控制视觉状态。"
  },
  card: {
    command: "pnpm dlx vekui add card --cwd .",
    dependency: "utils",
    description: "Card、Header、Content、Footer 等组合式内容容器。",
    exportName: "Card",
    registryPath: "/weapp/r/card.json",
    source: "packages/ui/src/components/card.tsx",
    state: "composition",
    taroNote: "由 Taro View/Text 组合，不引入 DOM 节点假设。"
  },
  checkbox: {
    command: "pnpm dlx vekui add checkbox --cwd .",
    dependency: "utils",
    description: "触摸优先的勾选控件，支持受控和非受控状态。",
    exportName: "Checkbox",
    registryPath: "/weapp/r/checkbox.json",
    source: "packages/ui/src/components/checkbox.tsx",
    state: "data-state",
    taroNote: "命中区域按小程序触摸尺寸设计，状态通过 data-state 暴露。"
  },
  dialog: {
    command: "pnpm dlx vekui add dialog --cwd .",
    dependency: "button, layer",
    description: "不使用 portal 的弹层组件，通过内部 Layer primitive 渲染。",
    exportName: "Dialog",
    registryPath: "/weapp/r/dialog.json",
    source: "packages/ui/src/components/dialog.tsx",
    state: "data-state",
    taroNote: "弹层留在小程序 app tree 内，不访问 document、window 或 ReactDOM。"
  },
  field: {
    command: "pnpm dlx vekui add field --cwd .",
    dependency: "utils",
    description: "表单字段容器，统一 label、description、message 和 invalid 状态。",
    exportName: "Field",
    registryPath: "/weapp/r/field.json",
    source: "packages/ui/src/components/field.tsx",
    state: "data-invalid",
    taroNote: "把表单语义压到可组合的 Taro 结构里，便于和 Input/Textarea 复用。"
  },
  input: {
    command: "pnpm dlx vekui add input --cwd .",
    dependency: "variants",
    description: "基于 Taro Input 的文本输入，包含 disabled、invalid 和 token class。",
    exportName: "Input",
    registryPath: "/weapp/r/input.json",
    source: "packages/ui/src/components/input.tsx",
    state: "data-invalid",
    taroNote: "直接包裹 @tarojs/components Input，不使用浏览器 input。"
  },
  "radio-group": {
    command: "pnpm dlx vekui add radio-group --cwd .",
    dependency: "utils",
    description: "单选组和选项组件，状态通过 data-state 暴露。",
    exportName: "RadioGroup",
    name: "Radio Group",
    registryPath: "/weapp/r/radio-group.json",
    source: "packages/ui/src/components/radio-group.tsx",
    state: "data-state",
    taroNote: "以触摸优先的 View 结构实现，不依赖 Web radio input。"
  },
  switch: {
    command: "pnpm dlx vekui add switch --cwd .",
    dependency: "utils",
    description: "小程序安全的开关控件，thumb 位移不依赖危险 Tailwind transform。",
    exportName: "Switch",
    registryPath: "/weapp/r/switch.json",
    source: "packages/ui/src/components/switch.tsx",
    state: "data-state",
    taroNote: "thumb 使用 margin 位移和 transition-[margin]，避免 WXSS translate 风险。"
  },
  tabs: {
    command: "pnpm dlx vekui add tabs --cwd .",
    dependency: "utils",
    description: "页内内容切换，trigger 和 panel 通过 data-state 关联。",
    exportName: "Tabs",
    registryPath: "/weapp/r/tabs.json",
    source: "packages/ui/src/components/tabs.tsx",
    state: "data-state",
    taroNote: "面向点击/触摸切换，不依赖 hover-only 或 Web menu-bar 行为。"
  },
  textarea: {
    command: "pnpm dlx vekui add textarea --cwd .",
    dependency: "variants",
    description: "基于 Taro Textarea 的多行输入，保留小程序安全 className 合并。",
    exportName: "Textarea",
    registryPath: "/weapp/r/textarea.json",
    source: "packages/ui/src/components/textarea.tsx",
    state: "data-disabled",
    taroNote: "直接使用 Taro Textarea，并暴露 disabled/invalid 数据状态。"
  },
  toast: {
    command: "pnpm dlx vekui add toast --cwd .",
    dependency: "utils",
    description: "挂在小程序 app tree 内的 toast provider、viewport 和 item。",
    exportName: "Toast",
    registryPath: "/weapp/r/toast.json",
    source: "packages/ui/src/components/toast.tsx",
    state: "data-state",
    taroNote: "不使用 portal，反馈层通过组件树内 viewport 呈现。"
  }
}

const migratedComponentSlugs = new Set(
  [
    "action-sheet",
    "accordion",
    "activity-indicator",
    "article",
    "alert",
    "aspect-ratio",
    "avatar",
    "badge",
    "breadcrumb",
    "button",
    "button-group",
    "calendar",
    "card",
    "carousel",
    "checkbox",
    "collapsible",
    "countdown",
    "curtain",
    "data-list",
    "dialog",
    "divider",
    "drawer",
    "empty",
    "fab",
    "field",
    "flex",
    "float-layout",
    "form",
    "grid",
    "icon",
    "image",
    "image-picker",
    "indexes",
    "input",
    "input-group",
    "input-number",
    "input-otp",
    "item",
    "label",
    "list",
    "load-more",
    "loading",
    "message",
    "modal",
    "nav-bar",
    "notice-bar",
    "pagination",
    "picker",
    "picker-view",
    "progress",
    "popover",
    "radio-group",
    "range",
    "rate",
    "safe-area",
    "scroll-area",
    "search-bar",
    "separator",
    "segmented-control",
    "sheet",
    "skeleton",
    "slider",
    "spinner",
    "steps",
    "swipe-action",
    "switch",
    "tab-bar",
    "table",
    "tabs",
    "tag",
    "textarea",
    "toast",
    "toggle",
    "toggle-group",
    "timeline",
    "typography"
  ]
)

const shadcnComponentOrder = [
  ["Accordion", "accordion"],
  ["Alert", "alert"],
  ["Alert Dialog", "alert-dialog"],
  ["Aspect Ratio", "aspect-ratio"],
  ["Avatar", "avatar"],
  ["Badge", "badge"],
  ["Breadcrumb", "breadcrumb"],
  ["Button", "button"],
  ["Button Group", "button-group"],
  ["Calendar", "calendar"],
  ["Card", "card"],
  ["Carousel", "carousel"],
  ["Chart", "chart"],
  ["Checkbox", "checkbox"],
  ["Collapsible", "collapsible"],
  ["Combobox", "combobox"],
  ["Command", "command"],
  ["Context Menu", "context-menu"],
  ["Data Table", "data-table"],
  ["Date Picker", "date-picker"],
  ["Dialog", "dialog"],
  ["Direction", "direction"],
  ["Drawer", "drawer"],
  ["Dropdown Menu", "dropdown-menu"],
  ["Empty", "empty"],
  ["Field", "field"],
  ["Hover Card", "hover-card"],
  ["Input", "input"],
  ["Input Group", "input-group"],
  ["Input OTP", "input-otp"],
  ["Item", "item"],
  ["Kbd", "kbd"],
  ["Label", "label"],
  ["Menubar", "menubar"],
  ["Native Select", "native-select"],
  ["Navigation Menu", "navigation-menu"],
  ["Pagination", "pagination"],
  ["Popover", "popover"],
  ["Progress", "progress"],
  ["Radio Group", "radio-group"],
  ["Resizable", "resizable"],
  ["Scroll Area", "scroll-area"],
  ["Select", "select"],
  ["Separator", "separator"],
  ["Sheet", "sheet"],
  ["Sidebar", "sidebar"],
  ["Skeleton", "skeleton"],
  ["Slider", "slider"],
  ["Sonner", "sonner"],
  ["Spinner", "spinner"],
  ["Switch", "switch"],
  ["Table", "table"],
  ["Tabs", "tabs"],
  ["Textarea", "textarea"],
  ["Toast", "toast"],
  ["Toggle", "toggle"],
  ["Toggle Group", "toggle-group"],
  ["Tooltip", "tooltip"],
  ["Typography", "typography"]
] as const

export const componentCatalog: ComponentCatalogItem[] = shadcnComponentOrder.map(([name, slug]) => {
  const available = availableBySlug[slug]
  if (available) {
    return {
      ...available,
      name: available.name ?? name,
      slug,
      status: "available"
    }
  }

  if (migratedComponentSlugs.has(slug)) {
    return {
      command: `pnpm dlx vekui add ${slug} --cwd .`,
      dependency: "primitives, state",
      description: `${name} 已从旧小程序 demo 迁移为 Taro-safe 源码组件。`,
      exportName: name.replaceAll(" ", ""),
      name,
      registryPath: `/weapp/r/${slug}.json`,
      source: `packages/ui/src/components/${slug}.tsx`,
      state: "data-state",
      status: "available",
      slug,
      taroNote: "使用 @tarojs/components、语义 token 和小程序安全 Tailwind utilities。"
    }
  }

  return {
    description: `${name} 已纳入 VekUI WeApp 路线图，落地前会先确认 Taro primitive、状态属性、token class 和 WXSS 安全规则。`,
    exportName: name.replaceAll(" ", ""),
    name,
    roadmap: "Planned for a later registry batch after the v0 foundation stays stable.",
    slug,
    status: "planned",
    taroNote: "需要重新设计为小程序树内交互，不能直接搬运 Radix、DOM API 或浏览器 portal。"
  }
})

export const componentStats = {
  available: componentCatalog.filter((component) => component.status === "available").length,
  total: componentCatalog.length
}
