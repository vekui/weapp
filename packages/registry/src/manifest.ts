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
    name: "layer",
    title: "Layer primitive",
    description: "App-tree layer primitive for Dialog and Toast-like overlays.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/layer.tsx",
        source: "packages/ui/src/primitives/layer.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "button",
    title: "Button",
    description: "Native Taro Button wrapper with token variants and loading state.",
    type: "registry:ui",
    registryDependencies: ["variants"],
    files: [
      {
        path: "components/ui/button.tsx",
        source: "packages/ui/src/components/button.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "card",
    title: "Card",
    description: "Tokenized card composition primitives.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/card.tsx",
        source: "packages/ui/src/components/card.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "badge",
    title: "Badge",
    description: "Small status label with semantic variants.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/badge.tsx",
        source: "packages/ui/src/components/badge.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "field",
    title: "Field",
    description: "Form field grouping, labels, descriptions, and error text.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/field.tsx",
        source: "packages/ui/src/components/field.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "input",
    title: "Input",
    description: "Mini-program input wrapper with disabled and invalid states.",
    type: "registry:ui",
    registryDependencies: ["variants"],
    files: [
      {
        path: "components/ui/input.tsx",
        source: "packages/ui/src/components/input.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "textarea",
    title: "Textarea",
    description: "Mini-program multiline input wrapper.",
    type: "registry:ui",
    registryDependencies: ["variants"],
    files: [
      {
        path: "components/ui/textarea.tsx",
        source: "packages/ui/src/components/textarea.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "checkbox",
    title: "Checkbox",
    description: "Touch-first checkbox with controlled and uncontrolled state.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/checkbox.tsx",
        source: "packages/ui/src/components/checkbox.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "radio-group",
    title: "RadioGroup",
    description: "Touch-first radio option group.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/radio-group.tsx",
        source: "packages/ui/src/components/radio-group.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "switch",
    title: "Switch",
    description: "Mini-program-safe switch with margin-based thumb movement.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/switch.tsx",
        source: "packages/ui/src/components/switch.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "tabs",
    title: "Tabs",
    description: "Touch tab switcher with active state attributes.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/tabs.tsx",
        source: "packages/ui/src/components/tabs.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "dialog",
    title: "Dialog",
    description: "No-portal dialog rendered through the Layer primitive.",
    type: "registry:ui",
    registryDependencies: ["button", "layer"],
    files: [
      {
        path: "components/ui/dialog.tsx",
        source: "packages/ui/src/components/dialog.tsx",
        type: "registry:component"
      }
    ]
  },
  {
    name: "toast",
    title: "Toast",
    description: "App-tree toast and viewport components.",
    type: "registry:ui",
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/toast.tsx",
        source: "packages/ui/src/components/toast.tsx",
        type: "registry:component"
      }
    ]
  }
]

export const publicComponentNames = [
  "button",
  "card",
  "badge",
  "field",
  "input",
  "textarea",
  "checkbox",
  "radio-group",
  "switch",
  "tabs",
  "dialog",
  "toast"
]
