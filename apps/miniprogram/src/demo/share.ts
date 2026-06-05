import {
  useShareAppMessage,
  useShareTimeline,
  type ShareAppMessageReturn,
  type ShareTimelineReturnObject
} from "@tarojs/taro"

type DemoSharePage = object & {
  enableShareAppMessage?: boolean
  enableShareTimeline?: boolean
}

type DemoShareOptions = {
  path?: string
  query?: string
  title?: string
}

const defaultShareTitle = "VekUI WeApp"
const defaultSharePath = "/pages/index/index"

function getShareTitle(title?: string) {
  return title ? `${title} · VekUI WeApp` : defaultShareTitle
}

export function enableDemoPageShare<T extends DemoSharePage>(page: T) {
  page.enableShareAppMessage = true
  page.enableShareTimeline = true

  return page
}

export function useDemoPageShare(options: DemoShareOptions = {}) {
  const title = getShareTitle(options.title)
  const path = options.path ?? defaultSharePath
  const query = options.query

  useShareAppMessage((): ShareAppMessageReturn => ({
    path,
    title
  }))

  useShareTimeline((): ShareTimelineReturnObject => ({
    query,
    title
  }))
}
