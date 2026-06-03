export const demoThemes = [
  {
    id: "default",
    label: "默认",
    description: "干净的注册表基线",
    className: "theme-default",
    primaryColor: "#2463eb",
    iconColors: {
      foreground: "#0f1729",
      muted: "#65758b",
      primary: "#2463eb",
      "primary-foreground": "#ffffff",
      destructive: "#ef4343"
    },
    palette: [
      { name: "主色", value: "#2463eb", className: "border-primary" },
      { name: "强调", value: "#2ec2b3", className: "border-accent" },
      { name: "边界", value: "#e1e7ef", className: "border-border" }
    ],
    swatches: [
      { name: "主色", className: "bg-primary" },
      { name: "强调", className: "bg-accent" }
    ]
  },
  {
    id: "learning",
    label: "学习",
    description: "冷静的文档与示例表面",
    className: "theme-learning",
    primaryColor: "#3182ed",
    iconColors: {
      foreground: "#111927",
      muted: "#566881",
      primary: "#3182ed",
      "primary-foreground": "#ffffff",
      destructive: "#ef4343"
    },
    palette: [
      { name: "主色", value: "#3182ed", className: "border-primary" },
      { name: "强调", value: "#29bc86", className: "border-accent" },
      { name: "边界", value: "#d0dae7", className: "border-border" }
    ],
    swatches: [
      { name: "主色", className: "bg-primary" },
      { name: "强调", className: "bg-accent" }
    ]
  },
  {
    id: "warm",
    label: "暖调",
    description: "更有产品感的温暖界面",
    className: "theme-warm",
    primaryColor: "#f2672c",
    iconColors: {
      foreground: "#312117",
      muted: "#786254",
      primary: "#f2672c",
      "primary-foreground": "#ffffff",
      destructive: "#ef4343"
    },
    palette: [
      { name: "主色", value: "#f2672c", className: "border-primary" },
      { name: "强调", value: "#1e9fb8", className: "border-accent" },
      { name: "边界", value: "#e3d2bf", className: "border-border" }
    ],
    swatches: [
      { name: "主色", className: "bg-primary" },
      { name: "强调", className: "bg-accent" }
    ]
  }
] as const

export type DemoThemeId = (typeof demoThemes)[number]["id"]
