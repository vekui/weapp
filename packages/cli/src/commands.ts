import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { configPath, defaultConfig, readConfig, writeConfig } from "./config.js"
import { exists, readJsonFile, writeJsonFile, writeTextFile } from "./fs.js"
import { listRegistryItems, resolveRegistryItems } from "./registry.js"

type PackageJson = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  name?: string
  scripts?: Record<string, string>
}

export type CommandResult = {
  code: number
  lines: string[]
}

function ok(lines: string[] = []): CommandResult {
  return { code: 0, lines }
}

function fail(message: string): CommandResult {
  return { code: 1, lines: [message] }
}

export function parseFlags(argv: string[]) {
  const flags = new Map<string, string | boolean>()
  const rest: string[] = []

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (!arg?.startsWith("--")) {
      if (arg) rest.push(arg)
      continue
    }

    const key = arg.slice(2)
    const next = argv[index + 1]
    if (next && !next.startsWith("--")) {
      flags.set(key, next)
      index += 1
    } else {
      flags.set(key, true)
    }
  }

  return { flags, rest }
}

function getCwd(flags: Map<string, string | boolean>) {
  const cwd = flags.get("cwd")
  return path.resolve(typeof cwd === "string" ? cwd : process.cwd())
}

function shouldForce(flags: Map<string, string | boolean>) {
  return flags.get("force") === true || flags.get("yes") === true
}

function isDryRun(flags: Map<string, string | boolean>) {
  return flags.get("dry-run") === true
}

function targetPath(cwd: string, registryPath: string, config = defaultConfig) {
  if (registryPath.startsWith("components/ui/")) {
    return path.join(
      cwd,
      config.aliases.components,
      registryPath.replace("components/ui/", "")
    )
  }

  if (registryPath.startsWith("lib/")) {
    return path.join(cwd, config.aliases.lib, path.basename(registryPath))
  }

  if (registryPath.startsWith("styles/")) {
    return path.join(cwd, config.aliases.styles, path.basename(registryPath))
  }

  return path.join(cwd, registryPath)
}

async function updatePackageJson(cwd: string, dependencies: Record<string, string>) {
  const packagePath = path.join(cwd, "package.json")
  const packageJson = await readJsonFile<PackageJson>(packagePath, { name: "vekui-app" })
  packageJson.dependencies ??= {}

  for (const [name, version] of Object.entries(dependencies)) {
    if (!packageJson.dependencies[name] && !packageJson.devDependencies?.[name]) {
      packageJson.dependencies[name] = version
    }
  }

  await writeJsonFile(packagePath, packageJson)
}

export async function initCommand(argv: string[]): Promise<CommandResult> {
  const { flags } = parseFlags(argv)
  const cwd = getCwd(flags)
  const dryRun = isDryRun(flags)
  const force = shouldForce(flags)

  const plannedFiles = [
    configPath(cwd),
    path.join(cwd, defaultConfig.aliases.lib, "cn.ts"),
    path.join(cwd, defaultConfig.aliases.styles, "vekui.css")
  ]

  if (dryRun) {
    return ok(plannedFiles.map((file) => `create ${path.relative(cwd, file)}`))
  }

  await writeConfig(cwd, defaultConfig)
  const items = await resolveRegistryItems(["utils"])

  for (const item of items) {
    for (const file of item.files) {
      await writeTextFile(targetPath(cwd, file.path), file.content, force)
    }
  }

  await updatePackageJson(cwd, {
    "class-variance-authority": "0.7.1",
    clsx: "2.1.1",
    "tailwind-merge": "3.6.0"
  })

  return ok(["Initialized VekUI WeApp project."])
}

export async function addCommand(argv: string[]): Promise<CommandResult> {
  const { flags, rest } = parseFlags(argv)
  const cwd = getCwd(flags)
  const dryRun = isDryRun(flags)
  const force = shouldForce(flags)

  if (rest.length === 0) {
    return fail("Usage: vekui add <component...> [--cwd .]")
  }

  const config = await readConfig(cwd)
  const items = await resolveRegistryItems(rest)
  const dependencies: Record<string, string> = {}
  const planned: string[] = []

  for (const item of items) {
    Object.assign(dependencies, item.dependencies)
    for (const file of item.files) {
      const output = targetPath(cwd, file.path, config)
      planned.push(path.relative(cwd, output))
      if (!dryRun) {
        await writeTextFile(output, file.content, force)
      }
    }
  }

  if (!dryRun) {
    await updatePackageJson(cwd, dependencies)
  }

  return ok(planned.map((file) => `${dryRun ? "would write" : "wrote"} ${file}`))
}

export async function listCommand(): Promise<CommandResult> {
  const names = await listRegistryItems()
  return ok(names.map((name) => `- ${name}`))
}

async function collectSourceFiles(dir: string): Promise<string[]> {
  if (!(await exists(dir))) {
    return []
  }

  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return collectSourceFiles(entryPath)
      }
      if (/\.(ts|tsx|js|jsx|css)$/.test(entry.name)) {
        return [entryPath]
      }
      return []
    })
  )

  return files.flat()
}

export async function doctorCommand(argv: string[]): Promise<CommandResult> {
  const { flags } = parseFlags(argv)
  const cwd = getCwd(flags)
  const problems: string[] = []

  if (!(await exists(configPath(cwd)))) {
    problems.push("Missing vekui.json. Run `vekui init` first.")
  }

  let config = defaultConfig
  if (await exists(configPath(cwd))) {
    config = await readConfig(cwd)
    if (!(await exists(path.join(cwd, config.tailwind.css)))) {
      problems.push(`Missing Tailwind CSS entry: ${config.tailwind.css}`)
    }
  }

  const packageJson = await readJsonFile<PackageJson>(path.join(cwd, "package.json"), {})
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies }
  for (const dependency of ["@tarojs/components", "@tarojs/taro", "react"]) {
    if (!allDeps[dependency]) {
      problems.push(`Missing dependency: ${dependency}`)
    }
  }

  const forbidden = [
    "@radix-ui/",
    "lucide-react",
    "ReactDOM",
    "window.",
    "document.",
    "HTMLElement",
    "translate-"
  ]
  const sourceFiles = await collectSourceFiles(path.join(cwd, config.aliases.components))
  for (const file of sourceFiles) {
    const content = await readFile(file, "utf8")
    for (const token of forbidden) {
      if (content.includes(token)) {
        problems.push(`Forbidden token ${token} in ${path.relative(cwd, file)}`)
      }
    }
  }

  if (problems.length > 0) {
    return fail(["VekUI doctor found problems:", ...problems].join("\n"))
  }

  return ok(["VekUI doctor passed."])
}
