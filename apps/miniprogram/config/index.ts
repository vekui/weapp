import path from "node:path"
import { createRequire } from "node:module"
import { defineConfig } from "@tarojs/cli"
import tailwindcss from "@tailwindcss/postcss"
import autoprefixer from "autoprefixer"
import { UnifiedViteWeappTailwindcssPlugin } from "weapp-tailwindcss/vite"

const require = createRequire(import.meta.url)
const taroWeappComponentsPath = require.resolve(
  "@tarojs/plugin-platform-weapp/dist/components-react.js"
)

type ViteConfig = {
  css?: {
    postcss?: {
      plugins?: unknown[]
    }
  }
}

export default defineConfig(async (merge) => {
  const config = {
    projectName: "vekui-weapp",
    date: "2026-05-29",
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2
    },
    sourceRoot: "src",
    outputRoot: "dist",
    framework: "react",
    compiler: {
      type: "vite",
      vitePlugins: [
        {
          name: "resolve-taro-weapp-components",
          resolveId(id: string) {
            if (id === "@tarojs/plugin-platform-weapp/dist/components-react") {
              return taroWeappComponentsPath
            }
            return null
          }
        },
        {
          name: "postcss-config-loader-plugin",
          config(config: ViteConfig) {
            config.css ??= {}
            config.css.postcss ??= {}
            config.css.postcss.plugins = [
              tailwindcss(),
              autoprefixer(),
              ...(config.css.postcss.plugins ?? [])
            ]
          }
        },
        UnifiedViteWeappTailwindcssPlugin({
          appType: "taro",
          cssEntries: [path.resolve(__dirname, "../src/app.css")],
          rem2rpx: true
        })
      ]
    },
    alias: {
      "@vekui/weapp": path.resolve(__dirname, "../../../packages/ui/src")
    },
    mini: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        pxtransform: {
          enable: true,
          config: {}
        }
      },
      compile: {
        include: [path.resolve(__dirname, "../../../packages/ui/src")]
      }
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static"
    }
  }

  return merge({}, config)
})
