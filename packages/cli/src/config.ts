import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

export type VekuiConfig = {
  aliases: {
    components: string
    lib: string
    styles: string
  }
  schema: string
  style: string
  tailwind: {
    css: string
  }
  tsx: boolean
}

export const defaultConfig: VekuiConfig = {
  schema: "https://vekui.github.io/weapp/r/schema.json",
  style: "default",
  tsx: true,
  tailwind: {
    css: "src/styles/vekui.css"
  },
  aliases: {
    components: "src/components/ui",
    lib: "src/lib",
    styles: "src/styles"
  }
}

export function configPath(cwd: string) {
  return path.join(cwd, "vekui.json")
}

export async function readConfig(cwd: string) {
  const content = await readFile(configPath(cwd), "utf8")
  return JSON.parse(content) as VekuiConfig
}

export async function writeConfig(cwd: string, config = defaultConfig) {
  await writeFile(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`)
}
