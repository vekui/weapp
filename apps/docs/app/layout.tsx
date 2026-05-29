import { Footer, Layout, Navbar } from "nextra-theme-docs"
import { getPageMap } from "nextra/page-map"
import type * as React from "react"
import "nextra-theme-docs/style.css"
import "./site.css"

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
          footer={<Footer>MIT 2026 VekUI · Built for Taro React WeChat mini programs</Footer>}
          navbar={
            <Navbar
              logo={
                <span className="vekui-nav-logo">
                  <img src="/weapp/vekui-logo.png" alt="" />
                  <b>VekUI WeApp</b>
                </span>
              }
              projectLink="https://github.com/vekui/weapp"
            />
          }
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
