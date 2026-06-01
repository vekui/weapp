import * as React from "react"

import type { InputBaseProps } from "@vekui/weapp"
import {
  Accordion,
  ActionSheet,
  ActivityIndicator,
  Alert,
  AlertDialog,
  Article,
  Avatar,
  AvatarFallback,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  Checkbox,
  Collapsible,
  ContextMenu,
  Countdown,
  Curtain,
  DatePicker,
  CurtainTitle,
  Divider,
  Dialog,
  DropdownMenu,
  Drawer,
  Empty,
  Fab,
  Field,
  Flex,
  FlexItem,
  FloatLayout,
  FloatLayoutTitle,
  Form,
  Grid,
  GridItem,
  HoverCard,
  Icon,
  Image,
  ImagePicker,
  Indexes,
  Input,
  InputGroup,
  InputNumber,
  InputOTP,
  List,
  ListItem,
  LoadMore,
  Loading,
  Message,
  Modal,
  NavBar,
  NativeSelect,
  NoticeBar,
  Pagination,
  Picker,
  PickerView,
  Progress,
  RadioGroup,
  Range,
  Rate,
  SearchBar,
  Select,
  SegmentedControl,
  Slider,
  Steps,
  SwipeAction,
  Switch,
  TabBar,
  TabBarItem,
  Tabs,
  Tag,
  Text,
  Textarea,
  Timeline,
  Toast,
  ToastDescription,
  ToastTitle,
  Tooltip
} from "@vekui/weapp"

import { getDemoComponent } from "./catalog"

type DemoPanelProps = React.PropsWithChildren<{
  title: string
}>

type DemoPageProps = {
  slug: string
}

type SearchInputEvent = Parameters<NonNullable<InputBaseProps["onInput"]>>[0]

function DemoPanel({ children, title }: DemoPanelProps) {
  return (
    <Box className="px-6 py-5">
      <Box className="mb-4 flex flex-row items-center gap-3">
        <Box className="h-[32rpx] w-[4rpx] rounded-full bg-primary" />
        <Text className="text-base font-semibold leading-[42rpx] text-foreground">{title}</Text>
      </Box>
      <Box className="flex flex-col gap-4">{children}</Box>
    </Box>
  )
}

function DemoPageShell({ children, title }: React.PropsWithChildren<{ title: string }>) {
  return (
    <Box className="theme-learning min-h-screen bg-background pb-8">
      <Box className="bg-muted px-6 pb-8 pt-10">
        <Text className="block text-xl font-semibold leading-[56rpx] text-foreground">{title}</Text>
        <Box className="mt-4 h-[4rpx] w-[96rpx] rounded-full bg-primary" />
      </Box>
      {children}
    </Box>
  )
}

const colorGroups = [
  {
    title: "主色",
    colors: [
      { name: "浅蓝色", value: "#78A4FA" },
      { name: "品牌蓝", value: "#6190E8" },
      { name: "深蓝色", value: "#346FC2" }
    ]
  },
  {
    title: "辅助色",
    colors: [
      { name: "蓝色 - Info", value: "#78A4FA" },
      { name: "绿色 - Positive", value: "#13CE66" },
      { name: "红色 - Negative", value: "#FF4949" },
      { name: "黄色 - Warning", value: "#FFC82C" }
    ]
  },
  {
    title: "中性色",
    colors: [
      { name: "黑色 0", value: "#333333" },
      { name: "灰色 2", value: "#999999" },
      { name: "灰色 4", value: "#E5E5E5" }
    ]
  }
]

function ColorDemo() {
  return (
    <>
      {colorGroups.map((group) => (
        <DemoPanel key={group.title} title={group.title}>
          <Box className="grid grid-cols-3 gap-4">
            {group.colors.map((color) => (
              <Box key={color.value} className="flex flex-col items-center gap-2">
                <Box
                  className="h-[112rpx] w-[112rpx] rounded-full border-[16rpx] border-border bg-background"
                  style={{ borderColor: color.value }}
                />
                <Text className="text-center text-xs text-muted-foreground">{color.name}</Text>
                <Text className="text-center text-xs text-muted-foreground">{color.value}</Text>
              </Box>
            ))}
          </Box>
        </DemoPanel>
      ))}
    </>
  )
}

function IconDemo() {
  const icons = ["plus", "minus", "check", "x", "info", "image", "home", "book-open", "user", "star"] as const
  return (
    <DemoPanel title="主要">
      <Grid columns={3}>
        {icons.map((icon) => (
          <GridItem key={icon}>
            <Icon name={icon} tone="muted" />
            <Text className="text-xs text-muted-foreground">{icon}</Text>
          </GridItem>
        ))}
      </Grid>
    </DemoPanel>
  )
}

function TypographyDemo() {
  return (
    <DemoPanel title="示例">
      <Box className="overflow-hidden rounded-md border border-border">
        {[
          ["H0，40PX", "60PX", "仅用于数字"],
          ["H1，36PX", "54PX", "大模块标题"],
          ["H2，32PX", "48PX", "常规标题"],
          ["H3，28PX", "42PX", "正文"],
          ["H4，24PX", "36PX", "辅助信息、注释"],
          ["H5，20PX", "30PX", "标签"]
        ].map((row, index) => (
          <Box key={row[0]} className="grid min-h-[88rpx] grid-cols-3 items-center border-b border-border px-3 last:border-b-0">
            <Text className={index < 2 ? "text-lg text-foreground" : "text-sm text-foreground"}>{row[0]}</Text>
            <Text className="text-sm text-foreground">{row[1]}</Text>
            <Text className="text-sm text-foreground">{row[2]}</Text>
          </Box>
        ))}
      </Box>
    </DemoPanel>
  )
}

function ButtonDemo() {
  return (
    <>
      <DemoPanel title="主操作">
        <Button>主操作按钮</Button>
        <Button loading>Loading</Button>
        <Button disabled>不可操作</Button>
      </DemoPanel>
      <DemoPanel title="次要操作">
        <Button variant="outline">次操作按钮</Button>
        <Button variant="outline" loading>Loading</Button>
        <Button variant="outline" disabled>不可操作</Button>
      </DemoPanel>
      <DemoPanel title="通栏与微信属性">
        <Button full>通栏按钮</Button>
        <Button full openType="share">分享</Button>
        <Form>
          <Button formType="submit" full variant="secondary">form submit</Button>
        </Form>
      </DemoPanel>
    </>
  )
}

function ButtonGroupDemo() {
  return (
    <DemoPanel title="示例">
      <ButtonGroup>
        <Button variant="outline">上一步</Button>
        <Button variant="outline">下一步</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">日</Button>
        <Button variant="secondary">周</Button>
        <Button variant="secondary">月</Button>
      </ButtonGroup>
    </DemoPanel>
  )
}

function ViewDemo({ slug }: { slug: string }) {
  const [curtainOpen, setCurtainOpen] = React.useState(false)

  if (slug === "avatar") {
    return (
      <DemoPanel title="基础用法">
        <Avatar>
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      </DemoPanel>
    )
  }

  if (slug === "article") {
    return (
      <DemoPanel title="示例">
        <Article.Root>
          <Article.Title>VekUI 小程序组件</Article.Title>
          <Article.Meta>First-party UI for Taro React</Article.Meta>
          <Article.Paragraph>文章组件用于展示结构化内容，适合公告、说明与轻量文档。</Article.Paragraph>
        </Article.Root>
      </DemoPanel>
    )
  }

  if (slug === "badge") {
    return (
      <DemoPanel title="示例">
        <Box className="flex flex-row gap-2">
          <Badge>New</Badge>
          <Badge variant="secondary">12</Badge>
          <Badge variant="outline">Draft</Badge>
        </Box>
      </DemoPanel>
    )
  }

  if (slug === "countdown") {
    return (
      <DemoPanel title="示例">
        <Countdown seconds={3661} />
      </DemoPanel>
    )
  }

  if (slug === "curtain") {
    return (
      <DemoPanel title="示例">
        <Button onClick={() => setCurtainOpen(true)}>打开幕帘</Button>
        <Curtain open={curtainOpen} onOpenChange={setCurtainOpen}>
          <CurtainTitle>幕帘内容</CurtainTitle>
          <Text className="mt-2 block text-sm text-muted-foreground">用于强调当前页面上方的临时信息。</Text>
          <Button className="mt-3" variant="secondary" onClick={() => setCurtainOpen(false)}>关闭</Button>
        </Curtain>
      </DemoPanel>
    )
  }

  if (slug === "divider") {
    return (
      <DemoPanel title="示例">
        <Divider>分割线</Divider>
      </DemoPanel>
    )
  }

  if (slug === "noticebar") {
    return (
      <DemoPanel title="示例">
        <NoticeBar variant="warning" text="这是一条通告栏信息" />
      </DemoPanel>
    )
  }

  if (slug === "tag") {
    return (
      <DemoPanel title="示例">
        <Box className="flex flex-row gap-2">
          <Tag>标签</Tag>
          <Tag selected>选中标签</Tag>
        </Box>
      </DemoPanel>
    )
  }

  if (slug === "timeline") {
    return (
      <DemoPanel title="示例">
        <Timeline.Root>
          <Timeline.Item status="success" title="创建" description="第一步已完成" />
          <Timeline.Item status="warning" title="审核" description="当前处理节点" />
          <Timeline.Item status="error" title="阻塞" description="需要关注" last />
        </Timeline.Root>
      </DemoPanel>
    )
  }

  if (slug === "image") {
    return (
      <DemoPanel title="示例">
        <Image className="h-[220rpx]" src="/assets/brand/vekui-logo-horizontal-transparent.png" mode="aspectFit" />
        <Image fallbackClassName="h-[220rpx]" src="" />
      </DemoPanel>
    )
  }

  if (slug === "swiper") {
    return (
      <DemoPanel title="示例">
        <Carousel.Root>
          {["bg-primary", "bg-secondary", "bg-muted"].map((className, index) => (
            <Carousel.Item key={className}>
              <Box className={`flex h-full items-center justify-center ${className}`}>
                <Text className="text-lg font-semibold text-foreground">Slide {index + 1}</Text>
              </Box>
            </Carousel.Item>
          ))}
        </Carousel.Root>
      </DemoPanel>
    )
  }

  if (slug === "load-more") {
    return (
      <DemoPanel title="示例">
        <LoadMore status="idle" />
        <LoadMore status="loading" />
        <LoadMore status="done" />
      </DemoPanel>
    )
  }

  return (
    <DemoPanel title="示例">
      <Steps.Root current={1}>
        <Steps.Item index={0} title="开始" description="已完成" />
        <Steps.Item index={1} title="当前" description="进行中" />
        <Steps.Item index={2} title="结束" description="待处理" last />
      </Steps.Root>
    </DemoPanel>
  )
}

function ActionDemo({ slug }: { slug: string }) {
  const [actionOpen, setActionOpen] = React.useState(false)
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [toastOpen, setToastOpen] = React.useState(false)

  if (slug === "action-sheet") {
    return (
      <DemoPanel title="示例">
        <Button onClick={() => setActionOpen(true)}>打开动作面板</Button>
        <ActionSheet
          actions={[
            { label: "普通操作", value: "default" },
            { label: "危险操作", value: "danger", destructive: true }
          ]}
          open={actionOpen}
          onOpenChange={setActionOpen}
          title="动作面板"
        />
      </DemoPanel>
    )
  }

  if (slug === "activity-indicator") {
    return (
      <DemoPanel title="示例">
        <ActivityIndicator text="加载中" />
        <Loading />
      </DemoPanel>
    )
  }

  if (slug === "alert") {
    return (
      <>
        <DemoPanel title="基础用法">
          <Alert.Root>
            <Alert.Title>提示标题</Alert.Title>
            <Alert.Description>用于展示页面内需要用户关注的信息。</Alert.Description>
          </Alert.Root>
        </DemoPanel>
        <DemoPanel title="危险状态">
          <Alert.Root variant="destructive">
            <Alert.Title>操作失败</Alert.Title>
            <Alert.Description>请检查输入内容后重试。</Alert.Description>
          </Alert.Root>
        </DemoPanel>
      </>
    )
  }

  if (slug === "alert-dialog") {
    return (
      <DemoPanel title="示例">
        <Button onClick={() => setAlertDialogOpen(true)}>打开确认对话框</Button>
        <AlertDialog.Root open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>确认删除项目？</AlertDialog.Title>
              <AlertDialog.Description>
                删除后无法恢复，请确认是否继续。
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>取消</AlertDialog.Cancel>
              <AlertDialog.Action variant="destructive">删除</AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </DemoPanel>
    )
  }

  if (slug === "dialog") {
    return (
      <DemoPanel title="示例">
        <Button onClick={() => setModalOpen(true)}>打开对话框</Button>
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
          <Dialog.Content>
            <Dialog.Title>对话框标题</Dialog.Title>
            <Dialog.Description>对话框渲染在小程序组件树内，不依赖 portal。</Dialog.Description>
            <Box className="mt-5 flex flex-row justify-end">
              <Dialog.Close className="rounded-md bg-secondary px-4">
                <Text className="text-sm text-secondary-foreground">关闭</Text>
              </Dialog.Close>
            </Box>
          </Dialog.Content>
        </Dialog.Root>
      </DemoPanel>
    )
  }

  if (slug === "dropdown-menu") {
    return (
      <DemoPanel title="示例">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="rounded-md border border-border bg-background px-4">
            <Text className="text-sm text-foreground">打开下拉菜单</Text>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item value="copy">复制</DropdownMenu.Item>
            <DropdownMenu.Item destructive value="delete">删除</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </DemoPanel>
    )
  }

  if (slug === "context-menu") {
    return (
      <DemoPanel title="示例">
        <ContextMenu.Root>
          <ContextMenu.Trigger className="rounded-md border border-border bg-background px-4">
            <Text className="text-sm text-foreground">点击打开上下文菜单</Text>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item value="refresh">刷新</ContextMenu.Item>
            <ContextMenu.Item disabled value="disabled">不可用</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </DemoPanel>
    )
  }

  if (slug === "fab") {
    return (
      <DemoPanel title="示例">
        <Text className="text-sm leading-[40rpx] text-muted-foreground">
          浮动按钮固定在页面右下角，适合主要快捷操作。
        </Text>
        <Fab>
          <Icon name="plus" tone="primary-foreground" />
        </Fab>
      </DemoPanel>
    )
  }

  if (slug === "hover-card") {
    return (
      <DemoPanel title="示例">
        <HoverCard.Root>
          <HoverCard.Trigger className="rounded-md border border-border bg-background px-4">
            <Text className="text-sm text-foreground">查看项目资料</Text>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <HoverCard.Title>VekUI WeApp</HoverCard.Title>
            <HoverCard.Description>
              面向 Taro React 微信小程序的源码分发 UI 基础。
            </HoverCard.Description>
          </HoverCard.Content>
        </HoverCard.Root>
      </DemoPanel>
    )
  }

  if (slug === "loading") {
    return (
      <DemoPanel title="示例">
        <Loading label="加载中" />
        <Loading className="justify-start rounded-md border border-border bg-card" label="正在同步数据" />
      </DemoPanel>
    )
  }

  if (slug === "modal") {
    return (
      <DemoPanel title="示例">
        <Button onClick={() => setModalOpen(true)}>打开模态框</Button>
        <Modal.Root open={modalOpen} onOpenChange={setModalOpen}>
          <Modal.Content>
            <Modal.Title>模态框标题</Modal.Title>
            <Modal.Description>这里是模态框内容。</Modal.Description>
            <Box className="mt-3 flex flex-row gap-2">
              <Modal.Close>取消</Modal.Close>
              <Modal.Action onClick={() => setModalOpen(false)}>
                <Text className="text-primary-foreground">确认</Text>
              </Modal.Action>
            </Box>
          </Modal.Content>
        </Modal.Root>
      </DemoPanel>
    )
  }

  if (slug === "progress") {
    return (
      <DemoPanel title="示例">
        <Progress value={32} />
        <Progress value={72} />
      </DemoPanel>
    )
  }

  if (slug === "toast") {
    return (
      <DemoPanel title="示例">
        <Button onClick={() => setToastOpen(true)}>显示轻提示</Button>
        <Toast open={toastOpen} variant="success">
          <ToastTitle>操作成功</ToastTitle>
          <ToastDescription>轻提示会显示在页面顶部。</ToastDescription>
        </Toast>
      </DemoPanel>
    )
  }

  if (slug === "tooltip") {
    return (
      <DemoPanel title="示例">
        <Tooltip.Root>
          <Tooltip.Trigger className="rounded-md border border-border bg-background px-4">
            <Text className="text-sm text-foreground">点击查看提示</Text>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Text className="text-sm text-foreground">提示内容会在小程序组件树内渲染。</Text>
          </Tooltip.Content>
        </Tooltip.Root>
      </DemoPanel>
    )
  }

  if (slug === "swipe-action") {
    return (
      <DemoPanel title="示例">
        <SwipeAction options={[{ label: "删除", value: "delete", destructive: true }]}>
          <Text className="text-sm text-foreground">点击行展开滑动操作</Text>
        </SwipeAction>
      </DemoPanel>
    )
  }

  return (
    <DemoPanel title="示例">
      <Message title="消息通知" description="用于展示页面内反馈。" variant="success" />
    </DemoPanel>
  )
}

function FormDemo({ slug }: { slug: string }) {
  const [checked, setChecked] = React.useState(true)
  const [switchOn, setSwitchOn] = React.useState(true)
  const [radio, setRadio] = React.useState("a")
  const [rate, setRate] = React.useState(3)
  const [numberValue, setNumberValue] = React.useState(2)
  const [dateValue, setDateValue] = React.useState("2026-05-31")
  const [selectValue, setSelectValue] = React.useState("compact")
  const [nativeSelectValue, setNativeSelectValue] = React.useState("wechat")
  const [sliderValue, setSliderValue] = React.useState(40)
  const [rangeValue, setRangeValue] = React.useState<[number, number]>([20, 70])
  const [query, setQuery] = React.useState("VekUI")
  const [images, setImages] = React.useState([{ id: "sample", url: "" }])

  if (slug === "form") {
    return (
      <DemoPanel title="示例">
        <Form>
          <Form.Item>
            <Field.Root>
              <Input placeholder="表单输入" />
            </Field.Root>
          </Form.Item>
          <Form.Actions>
            <Button formType="submit">提交</Button>
            <Button formType="reset" variant="outline">重置</Button>
          </Form.Actions>
        </Form>
      </DemoPanel>
    )
  }

  if (slug === "field") {
    return (
      <>
        <DemoPanel title="基础用法">
          <Field.Root>
            <Field.Label>用户名</Field.Label>
            <Input placeholder="请输入用户名" />
            <Field.Description>用户名会显示在个人资料中。</Field.Description>
          </Field.Root>
        </DemoPanel>
        <DemoPanel title="错误状态">
          <Field.Root invalid>
            <Field.Label>邮箱</Field.Label>
            <Input invalid placeholder="name@example.com" />
            <Field.Error>请输入有效邮箱地址。</Field.Error>
          </Field.Root>
        </DemoPanel>
      </>
    )
  }

  if (slug === "input") {
    return (
      <DemoPanel title="示例">
        <Input placeholder="请输入内容" />
        <Input invalid placeholder="错误状态" />
      </DemoPanel>
    )
  }

  if (slug === "input-group") {
    return (
      <DemoPanel title="示例">
        <InputGroup.Root>
          <InputGroup.Addon>https://</InputGroup.Addon>
          <InputGroup.Control>
            <InputGroup.Input placeholder="vekui.dev" />
          </InputGroup.Control>
        </InputGroup.Root>
      </DemoPanel>
    )
  }

  if (slug === "input-otp") {
    return (
      <DemoPanel title="示例">
        <InputOTP value="2026" length={6} />
      </DemoPanel>
    )
  }

  if (slug === "radio") {
    return (
      <DemoPanel title="示例">
        <RadioGroup.Root value={radio} onValueChange={setRadio}>
          <RadioGroup.Item value="a">选项 A</RadioGroup.Item>
          <RadioGroup.Item value="b">选项 B</RadioGroup.Item>
        </RadioGroup.Root>
      </DemoPanel>
    )
  }

  if (slug === "checkbox") {
    return (
      <DemoPanel title="示例">
        <Box className="flex min-h-[88rpx] flex-row items-center gap-2">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <Text className="text-sm text-foreground">复选项</Text>
        </Box>
      </DemoPanel>
    )
  }

  if (slug === "switch") {
    return (
      <DemoPanel title="示例">
        <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
      </DemoPanel>
    )
  }

  if (slug === "rate") {
    return (
      <DemoPanel title="示例">
        <Rate value={rate} onValueChange={setRate} />
      </DemoPanel>
    )
  }

  if (slug === "input-number") {
    return (
      <DemoPanel title="示例">
        <InputNumber value={numberValue} min={0} max={9} onValueChange={setNumberValue} />
      </DemoPanel>
    )
  }

  if (slug === "textarea") {
    return (
      <DemoPanel title="示例">
        <Textarea placeholder="请输入多行文本" />
      </DemoPanel>
    )
  }

  if (slug === "date-picker") {
    return (
      <>
        <DemoPanel title="基础用法">
          <DatePicker value={dateValue} onValueChange={setDateValue} min="2026-01-01" max="2026-12-31" />
        </DemoPanel>
        <DemoPanel title="状态">
          <DatePicker placeholder="请选择日期" />
          <DatePicker invalid placeholder="错误状态" />
        </DemoPanel>
      </>
    )
  }

  if (slug === "picker") {
    return (
      <DemoPanel title="示例">
        <Picker options={[{ label: "杭州", value: "hz" }, { label: "上海", value: "sh" }]} value="hz" />
      </DemoPanel>
    )
  }

  if (slug === "picker-view") {
    return (
      <DemoPanel title="示例">
        <PickerView.Root value={[0]}>
          <PickerView.Column>
            <PickerView.Option>一月</PickerView.Option>
            <PickerView.Option>二月</PickerView.Option>
          </PickerView.Column>
        </PickerView.Root>
      </DemoPanel>
    )
  }

  if (slug === "select") {
    const options = [
      { label: "紧凑", value: "compact" },
      { label: "舒适", value: "comfortable" },
      { label: "宽松", value: "spacious" }
    ]

    return (
      <>
        <DemoPanel title="基础用法">
          <Select options={options} value={selectValue} onValueChange={setSelectValue} />
        </DemoPanel>
        <DemoPanel title="状态">
          <Select options={options} placeholder="请选择密度" />
          <Select invalid options={options} placeholder="错误状态" />
          <Select disabled options={options} placeholder="禁用状态" />
        </DemoPanel>
      </>
    )
  }

  if (slug === "native-select") {
    const options = [
      { label: "微信小程序", value: "wechat" },
      { label: "支付宝小程序", value: "alipay" },
      { label: "H5", value: "h5" }
    ]

    return (
      <>
        <DemoPanel title="基础用法">
          <NativeSelect options={options} value={nativeSelectValue} onValueChange={setNativeSelectValue} />
        </DemoPanel>
        <DemoPanel title="状态">
          <NativeSelect options={options} placeholder="请选择平台" />
          <NativeSelect invalid options={options} placeholder="错误状态" />
          <NativeSelect disabled options={options} placeholder="禁用状态" />
        </DemoPanel>
      </>
    )
  }

  if (slug === "slider") {
    return (
      <DemoPanel title="示例">
        <Slider label="滑动条" value={sliderValue} onValueChange={setSliderValue} />
      </DemoPanel>
    )
  }

  if (slug === "search-bar") {
    return (
      <DemoPanel title="示例">
        <SearchBar
          value={query}
          onClear={() => setQuery("")}
          inputProps={{ onInput: (event: SearchInputEvent) => setQuery(String(event.detail.value ?? "")) }}
        />
      </DemoPanel>
    )
  }

  if (slug === "image-picker") {
    return (
      <DemoPanel title="示例">
        <ImagePicker
          files={images}
          onAdd={() => setImages((value) => [...value, { id: String(value.length), url: "" }])}
          onRemove={(file) => setImages((value) => value.filter((item) => item.id !== file.id))}
        />
      </DemoPanel>
    )
  }

  return (
    <DemoPanel title="示例">
      <Range value={rangeValue} onValueChange={setRangeValue} />
    </DemoPanel>
  )
}

function LayoutDemo({ slug }: { slug: string }) {
  const [floatOpen, setFloatOpen] = React.useState(false)

  if (slug === "flex") {
    return (
      <DemoPanel title="示例">
        <Flex align="center">
          <FlexItem grow>左侧</FlexItem>
          <FlexItem>右侧</FlexItem>
        </Flex>
      </DemoPanel>
    )
  }

  if (slug === "grid") {
    return (
      <DemoPanel title="示例">
        <Grid columns={3}>
          <GridItem>一</GridItem>
          <GridItem selected>二</GridItem>
          <GridItem>三</GridItem>
        </Grid>
      </DemoPanel>
    )
  }

  if (slug === "list") {
    return (
      <DemoPanel title="示例">
        <List>
          <ListItem>列表项一</ListItem>
          <ListItem selected>列表项二</ListItem>
        </List>
      </DemoPanel>
    )
  }

  if (slug === "card") {
    return (
      <DemoPanel title="示例">
        <Card>
          <CardHeader>
            <CardTitle>卡片标题</CardTitle>
            <CardDescription>卡片说明文本</CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="text-sm text-foreground">卡片内容区域。</Text>
          </CardContent>
        </Card>
      </DemoPanel>
    )
  }

  if (slug === "float-layout") {
    return (
      <DemoPanel title="示例">
        <Button onClick={() => setFloatOpen(true)}>打开浮动弹层</Button>
        <FloatLayout open={floatOpen} onOpenChange={setFloatOpen}>
          <FloatLayoutTitle>浮动弹层</FloatLayoutTitle>
          <Text className="mt-2 block text-sm text-muted-foreground">内容从底部进入。</Text>
          <Button className="mt-3" variant="secondary" onClick={() => setFloatOpen(false)}>关闭</Button>
        </FloatLayout>
      </DemoPanel>
    )
  }

  if (slug === "collapsible") {
    return (
      <DemoPanel title="示例">
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger className="border border-border px-3">
            <Text className="text-sm font-medium text-foreground">展开说明</Text>
            <Icon name="chevron-left" className="-rotate-90" size="sm" tone="muted" />
          </Collapsible.Trigger>
          <Collapsible.Content className="rounded-md bg-muted p-3">
            折叠内容会在小程序组件树内直接显示或隐藏。
          </Collapsible.Content>
        </Collapsible.Root>
      </DemoPanel>
    )
  }

  return (
    <DemoPanel title="示例">
      <Accordion.Root defaultValue="a" collapsible>
        <Accordion.Item value="a">
          <Accordion.Trigger>手风琴 A</Accordion.Trigger>
          <Accordion.Content>展开内容 A</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Trigger>手风琴 B</Accordion.Trigger>
          <Accordion.Content>展开内容 B</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </DemoPanel>
  )
}

function NavigationDemo({ slug }: { slug: string }) {
  const [page, setPage] = React.useState(1)
  const [tab, setTab] = React.useState("home")
  const [segment, setSegment] = React.useState("a")
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  if (slug === "navbar") {
    return (
      <DemoPanel title="示例">
        <NavBar title="导航栏" left={<Icon name="chevron-left" />} right={<Icon name="ellipsis" />} />
      </DemoPanel>
    )
  }

  if (slug === "tabbar") {
    return (
      <DemoPanel title="示例">
        <TabBar value={tab} onValueChange={setTab}>
          <TabBarItem value="home" label="首页" icon="home" />
          <TabBarItem value="learn" label="学习" icon="book-open" />
          <TabBarItem value="mine" label="我的" icon="user" />
        </TabBar>
      </DemoPanel>
    )
  }

  if (slug === "tabs") {
    return (
      <DemoPanel title="示例">
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">标签一</Tabs.Trigger>
            <Tabs.Trigger value="b">标签二</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">标签一内容</Tabs.Content>
          <Tabs.Content value="b">标签二内容</Tabs.Content>
        </Tabs.Root>
      </DemoPanel>
    )
  }

  if (slug === "segmented-control") {
    return (
      <DemoPanel title="示例">
        <SegmentedControl.Root value={segment} onValueChange={setSegment}>
          <SegmentedControl.Item value="a">分段一</SegmentedControl.Item>
          <SegmentedControl.Item value="b">分段二</SegmentedControl.Item>
        </SegmentedControl.Root>
      </DemoPanel>
    )
  }

  if (slug === "pagination") {
    return (
      <DemoPanel title="示例">
        <Pagination page={page} pageCount={5} onPageChange={setPage} />
      </DemoPanel>
    )
  }

  if (slug === "drawer") {
    return (
      <DemoPanel title="示例">
        <Button onClick={() => setDrawerOpen(true)}>打开抽屉</Button>
        <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
          <Drawer.Content>
            <Drawer.Title>抽屉标题</Drawer.Title>
            <Drawer.Description>从侧边出现的导航容器。</Drawer.Description>
            <Drawer.Close className="mt-3 rounded-md bg-secondary px-3">关闭</Drawer.Close>
          </Drawer.Content>
        </Drawer.Root>
      </DemoPanel>
    )
  }

  return (
    <DemoPanel title="示例">
      <Indexes
        sections={[
          { key: "A", title: "A", items: [{ label: "Alice", value: "alice" }] },
          { key: "B", title: "B", items: [{ label: "Beta", value: "beta" }] }
        ]}
      />
    </DemoPanel>
  )
}

function BasicDemo({ slug }: { slug: string }) {
  if (slug === "color") return <ColorDemo />
  if (slug === "icon") return <IconDemo />
  if (slug === "typo") return <TypographyDemo />
  if (slug === "button-group") return <ButtonGroupDemo />
  return <ButtonDemo />
}

function renderDemo(slug: string) {
  const component = getDemoComponent(slug)
  if (!component) {
    return (
      <DemoPanel title="示例">
        <Empty title="未找到组件" description="请从分类页重新进入。" />
      </DemoPanel>
    )
  }

  if (component.category === "basic") return <BasicDemo slug={slug} />
  if (component.category === "view") return <ViewDemo slug={slug} />
  if (component.category === "action") return <ActionDemo slug={slug} />
  if (component.category === "form") return <FormDemo slug={slug} />
  if (component.category === "layout") return <LayoutDemo slug={slug} />
  if (component.category === "navigation") return <NavigationDemo slug={slug} />

  return (
    <DemoPanel title="示例">
      <Calendar month="2026-05" defaultValue="2026-05-28" />
    </DemoPanel>
  )
}

export function DemoComponentPage({ slug }: DemoPageProps) {
  const component = getDemoComponent(slug)

  return (
    <DemoPageShell title={component?.title ?? "VekUI"}>
      {renderDemo(slug)}
    </DemoPageShell>
  )
}

export function makeDemoPage(slug: string) {
  return function ComponentDemoPage() {
    return <DemoComponentPage slug={slug} />
  }
}
