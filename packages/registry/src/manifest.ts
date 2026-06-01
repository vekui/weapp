export type RegistryFile = {
  path: string
  source: string
  type: "registry:component" | "registry:lib" | "registry:style"
}

export type RegistryItem = {
  dependencies?: Record<string, string>
  description: string
  files: RegistryFile[]
  name: string
  registryDependencies?: string[]
  title: string
  type: "registry:ui" | "registry:lib" | "registry:style"
}

const sharedDependencies = {
  "class-variance-authority": "0.7.1",
  clsx: "2.1.1",
  "tailwind-merge": "3.6.0"
}

const registryComponentNames = [
  "action-sheet",
  "accordion",
  "activity-indicator",
  "article",
  "alert",
  "alert-dialog",
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
  "date-picker",
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
  "hover-card",
  "icon",
  "image",
  "image-picker",
  "indexes",
  "input",
  "input-group",
  "input-number",
  "input-otp",
  "item",
  "kbd",
  "label",
  "list",
  "load-more",
  "loading",
  "message",
  "modal",
  "nav-bar",
  "native-select",
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
  "select",
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
  "tooltip",
  "toggle",
  "toggle-group",
  "timeline",
  "typography"
] as const

const titleOverrides: Record<string, string> = {
  "action-sheet": "Action Sheet",
  "activity-indicator": "Activity Indicator",
  "alert-dialog": "Alert Dialog",
  "aspect-ratio": "Aspect Ratio",
  "button-group": "Button Group",
  "data-list": "Data List",
  "float-layout": "Float Layout",
  "hover-card": "Hover Card",
  "image-picker": "Image Picker",
  "input-group": "Input Group",
  "input-number": "Input Number",
  "input-otp": "Input OTP",
  "load-more": "Load More",
  "nav-bar": "NavBar",
  "native-select": "Native Select",
  "notice-bar": "NoticeBar",
  "picker-view": "Picker View",
  "radio-group": "Radio Group",
  "safe-area": "Safe Area",
  "scroll-area": "Scroll Area",
  "segmented-control": "Segmented Control",
  "swipe-action": "Swipe Action",
  "tab-bar": "TabBar",
  "toggle-group": "Toggle Group"
}

const dependencyOverrides: Record<string, string[]> = {
  "action-sheet": ["layer", "state"],
  "activity-indicator": ["spinner", "primitives", "state"],
  "alert-dialog": ["button", "layer", "state", "primitives"],
  button: ["utils"],
  checkbox: ["icon", "primitives", "state"],
  curtain: ["layer", "state", "primitives"],
  dialog: ["button", "layer", "state", "primitives"],
  drawer: ["sheet"],
  icon: ["utils"],
  image: ["icon", "primitives", "state"],
  "input-number": ["icon", "primitives", "state"],
  kbd: ["primitives"],
  "load-more": ["spinner", "primitives", "state"],
  "float-layout": ["layer", "state", "primitives"],
  modal: ["layer", "state", "primitives"],
  pagination: ["button", "primitives", "state"],
  rate: ["icon", "primitives", "state"],
  sheet: ["layer", "state", "primitives"],
  "swipe-action": ["button", "primitives", "state"],
  "tab-bar": ["icon", "primitives", "state"],
  toast: ["primitives"]
}

const extraComponentFiles: Record<string, RegistryFile[]> = {
  button: [
    {
      path: "components/ui/button-variants.ts",
      source: "packages/ui/src/components/button-variants.ts",
      type: "registry:component"
    }
  ],
  tabs: [
    {
      path: "components/ui/tabs-state.ts",
      source: "packages/ui/src/components/tabs-state.ts",
      type: "registry:component"
    }
  ]
}

function toTitle(name: string) {
  if (titleOverrides[name]) {
    return titleOverrides[name]
  }

  return name
    .split("-")
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ")
}

function componentItem(name: (typeof registryComponentNames)[number]): RegistryItem {
  const title = toTitle(name)

  return {
    name,
    title,
    description: `${title} component adapted for Taro React WeChat mini programs.`,
    type: "registry:ui",
    registryDependencies: dependencyOverrides[name] ?? ["primitives", "state"],
    files: [
      {
        path: `components/ui/${name}.tsx`,
        source: `packages/ui/src/components/${name}.tsx`,
        type: "registry:component"
      },
      ...(extraComponentFiles[name] ?? [])
    ]
  }
}

export const registryItems: RegistryItem[] = [
  {
    name: "styles",
    title: "VekUI tokens",
    description: "Semantic Tailwind token CSS for Taro WeChat mini programs.",
    type: "registry:style",
    files: [
      {
        path: "styles/vekui.css",
        source: "packages/ui/src/styles/index.css",
        type: "registry:style"
      }
    ]
  },
  {
    name: "utils",
    title: "cn utility",
    description: "Class composition helper for VekUI components.",
    type: "registry:lib",
    dependencies: sharedDependencies,
    registryDependencies: ["styles"],
    files: [
      {
        path: "lib/cn.ts",
        source: "packages/ui/src/lib/cn.ts",
        type: "registry:lib"
      }
    ]
  },
  {
    name: "state",
    title: "State helpers",
    description: "Controllable state and strict context helpers for VekUI components.",
    type: "registry:lib",
    registryDependencies: ["utils"],
    files: [
      {
        path: "lib/use-controllable-state.ts",
        source: "packages/ui/src/lib/use-controllable-state.ts",
        type: "registry:lib"
      },
      {
        path: "lib/create-strict-context.tsx",
        source: "packages/ui/src/lib/create-strict-context.tsx",
        type: "registry:lib"
      },
      {
        path: "lib/compose-event-handlers.ts",
        source: "packages/ui/src/lib/compose-event-handlers.ts",
        type: "registry:lib"
      }
    ]
  },
  {
    name: "variants",
    title: "shared variants",
    description: "Shared component variant helpers.",
    type: "registry:lib",
    dependencies: {
      "class-variance-authority": "0.7.1"
    },
    registryDependencies: ["utils"],
    files: [
      {
        path: "lib/variants.ts",
        source: "packages/ui/src/lib/variants.ts",
        type: "registry:lib"
      }
    ]
  },
  {
    name: "primitives",
    title: "VekUI primitives",
    description: "Taro primitive wrappers shared by VekUI source components.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/primitives/box.tsx",
        source: "packages/ui/src/primitives/box.tsx",
        type: "registry:component"
      },
      {
        path: "components/ui/primitives/input-base.tsx",
        source: "packages/ui/src/primitives/input-base.tsx",
        type: "registry:component"
      },
      {
        path: "components/ui/primitives/pressable.tsx",
        source: "packages/ui/src/primitives/pressable.tsx",
        type: "registry:component"
      },
      {
        path: "components/ui/primitives/text.tsx",
        source: "packages/ui/src/primitives/text.tsx",
        type: "registry:component"
      },
      {
        path: "components/ui/primitives/index.ts",
        source: "packages/ui/src/primitives/index.ts",
        type: "registry:component"
      }
    ]
  },
  {
    name: "layer",
    title: "Layer primitive",
    description: "App-tree layer primitive for Dialog and Toast-like overlays.",
    type: "registry:ui",
    registryDependencies: ["primitives"],
    files: [
      {
        path: "components/ui/primitives/layer.tsx",
        source: "packages/ui/src/primitives/layer.tsx",
        type: "registry:component"
      }
    ]
  },
  ...registryComponentNames.map(componentItem)
]

export const publicComponentNames = [...registryComponentNames]
