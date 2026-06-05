import { useState } from "react"
import { Text, View } from "@tarojs/components"
import { useRouter } from "@tarojs/taro"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  RadioGroup,
  Switch,
  Tabs,
  Textarea,
  Toast,
  ToastViewport
} from "@vekui/weapp"

import { enableDemoPageShare, useDemoPageShare } from "../../demo/share"
import { getDemoThemeClassName, useDemoTheme } from "../../demo/theme"

function Demo({ name }: { name: string }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [switchOn, setSwitchOn] = useState(true)

  if (name === "button") {
    return <Button loading={false}>Primary Button</Button>
  }
  if (name === "card") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className="text-foreground">Card content</Text>
        </CardContent>
      </Card>
    )
  }
  if (name === "badge") {
    return <Badge>Stable</Badge>
  }
  if (name === "field") {
    return (
      <Field invalid>
        <FieldLabel>Username</FieldLabel>
        <FieldDescription>Use a short display name.</FieldDescription>
        <FieldError>Username is required.</FieldError>
      </Field>
    )
  }
  if (name === "input") {
    return <Input placeholder="Input text" />
  }
  if (name === "textarea") {
    return <Textarea placeholder="Write a note" />
  }
  if (name === "checkbox") {
    return <Checkbox defaultChecked label="Accept terms" />
  }
  if (name === "radio-group") {
    return (
      <RadioGroup
        defaultValue="a"
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" }
        ]}
      />
    )
  }
  if (name === "switch") {
    return <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
  }
  if (name === "tabs") {
    return (
      <Tabs
        items={[
          { content: "Account panel", label: "Account", value: "account" },
          { content: "Settings panel", label: "Settings", value: "settings" }
        ]}
      />
    )
  }
  if (name === "dialog") {
    return (
      <View>
        <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
        <Dialog
          description="Dialog is rendered inside the mini-program app tree."
          onOpenChange={setDialogOpen}
          open={dialogOpen}
          title="Dialog"
        >
          <Text className="text-foreground">No browser portal required.</Text>
        </Dialog>
      </View>
    )
  }
  if (name === "toast") {
    return (
      <ToastViewport>
        <Toast description="This toast is rendered in the app tree." title="Saved" tone="success" />
      </ToastViewport>
    )
  }

  return <Text className="text-muted-foreground">Unknown component.</Text>
}

export default function ComponentPage() {
  const router = useRouter()
  const name = String(router.params.name ?? "button")
  const [themeId] = useDemoTheme()
  useDemoPageShare({
    path: `/pages/component/index?name=${name}`,
    query: `name=${name}`,
    title: `${name} demo`
  })

  return (
    <View className={`${getDemoThemeClassName(themeId)} flex min-h-screen flex-col bg-background p-4 text-foreground`}>
      <View className="mb-4 flex flex-col items-start gap-2">
        <Badge variant="secondary">{name}</Badge>
        <Text className="block text-xl font-semibold text-foreground">Component Demo</Text>
      </View>
      <Demo name={name} />
    </View>
  )
}

enableDemoPageShare(ComponentPage)
