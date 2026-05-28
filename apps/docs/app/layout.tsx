import { Footer, Layout, Navbar } from "nextra-theme-docs"
import { getPageMap } from "nextra/page-map"
import type * as React from "react"
import "nextra-theme-docs/style.css"

export const metadata = {
  title: "VekUI WeApp",
  description: "Taro React 微信小程序源码分发组件库"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Layout
          docsRepositoryBase="https://github.com/vekui/weapp/tree/main/apps/docs"
          editLink="编辑此页"
          feedback={{ content: "反馈问题" }}
          footer={<Footer>MIT 2026 VekUI</Footer>}
          navbar={<Navbar logo={<b>VekUI WeApp</b>} projectLink="https://github.com/vekui/weapp" />}
          pageMap={await getPageMap()}
          search={null}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ title: "本页内容" }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
