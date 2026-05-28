const components = [
  "Button",
  "Card",
  "Badge",
  "Field",
  "Input",
  "Textarea",
  "Checkbox",
  "RadioGroup",
  "Switch",
  "Tabs",
  "Dialog",
  "Toast"
]

export default function ComponentsPage() {
  return (
    <main>
      <h1>组件</h1>
      <p>v0 先覆盖高频基础组件。</p>
      <ul>
        {components.map((component) => (
          <li key={component}>{component}</li>
        ))}
      </ul>
      <h2>组件契约</h2>
      <ul>
        <li>使用 @tarojs/components。</li>
        <li>支持 className。</li>
        <li>使用语义 token class。</li>
        <li>通过 data-state、data-disabled、data-invalid 或 data-loading 暴露状态。</li>
        <li>不依赖浏览器 DOM API 和 portal。</li>
      </ul>
    </main>
  )
}
