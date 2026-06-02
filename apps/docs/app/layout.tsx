import { Footer, Layout, Navbar } from "nextra-theme-docs"
import { getPageMap } from "nextra/page-map"
import "nextra-theme-docs/style.css"
import "./site.css"

type RootLayoutProps = {
  children: Parameters<typeof Layout>[0]["children"]
}

export const metadata = {
  title: "VekUI WeApp",
  description: "Taro React 微信小程序源码分发组件库",
  icons: {
    icon: "/weapp/vekui-mark.png"
  }
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Layout
          docsRepositoryBase="https://github.com/vekui/weapp/tree/main/apps/docs"
          editLink="编辑此页"
          feedback={{ content: "反馈问题" }}
          footer={
            <Footer>
              <div className="vekui-site-footer">
                <span>MIT 2026 VekUI · Built for Taro React WeChat mini programs</span>
                <div className="vekui-site-footer__qr">
                  <img src="/weapp/wechat-official-account-qr.jpg" alt="VekUI 微信公众号二维码" loading="lazy" />
                  <span>关注公众号</span>
                </div>
              </div>
            </Footer>
          }
          navbar={
            <Navbar
              logo={
                <span className="vekui-nav-logo">
                  <img src="/weapp/vekui-mark.png" alt="" />
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
