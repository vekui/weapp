#!/usr/bin/env node

import { spawn } from "node:child_process"
import { access } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const defaultProject = "apps/miniprogram"
const defaultTimeZone = "Asia/Shanghai"
const versionPattern = /^[A-Za-z0-9.]+$/

function defaultWechatDevtoolsCli(platform = process.platform) {
  if (platform === "darwin") {
    return "/Applications/wechatwebdevtools.app/Contents/MacOS/cli"
  }

  return "cli"
}

function formatUploadTime(date, timeZone = defaultTimeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23"
  })
  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  )

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`
}

function readOptionValue(argv, index, optionName) {
  const value = argv[index + 1]
  if (!value || value.startsWith("-")) {
    throw new Error(`Missing value for ${optionName}.`)
  }
  return [value, index + 1]
}

function assignOption(parsed, key, value) {
  parsed[key] = value
}

function parseUploadArgs(argv) {
  const parsed = {
    build: true,
    debug: false,
    dryRun: false,
    help: false
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === "--") {
      continue
    }

    if (arg === "--help" || arg === "-h") {
      parsed.help = true
      continue
    }

    if (arg === "--no-build") {
      parsed.build = false
      continue
    }

    if (arg === "--dry-run") {
      parsed.dryRun = true
      continue
    }

    if (arg === "--debug") {
      parsed.debug = true
      continue
    }

    const equalMatch = arg.match(/^--([^=]+)=(.*)$/)
    if (equalMatch) {
      assignOption(parsed, equalMatch[1], equalMatch[2])
      continue
    }

    const aliases = {
      "-v": "version",
      "--version": "version",
      "-d": "desc",
      "--desc": "desc",
      "-i": "info-output",
      "--info-output": "info-output",
      "--cli": "cli",
      "--lang": "lang",
      "--port": "port",
      "--project": "project",
      "--time-zone": "time-zone"
    }
    const key = aliases[arg]
    if (key) {
      const [value, nextIndex] = readOptionValue(argv, index, arg)
      assignOption(parsed, key, value)
      index = nextIndex
      continue
    }

    throw new Error(`Unknown option: ${arg}`)
  }

  return parsed
}

function resolveFromRepo(root, maybeRelativePath) {
  return path.isAbsolute(maybeRelativePath)
    ? maybeRelativePath
    : path.resolve(root, maybeRelativePath)
}

function normalizeUploadOptions({
  argv = [],
  env = process.env,
  now = new Date(),
  platform = process.platform,
  root = repoRoot
} = {}) {
  const parsed = parseUploadArgs(argv)

  if (parsed.help) {
    return {
      help: true,
      build: parsed.build,
      dryRun: parsed.dryRun
    }
  }

  const version = parsed.version ?? env.WEAPP_UPLOAD_VERSION
  if (!version) {
    throw new Error("Missing upload version. Pass --version 1.0.1 or set WEAPP_UPLOAD_VERSION.")
  }
  if (!versionPattern.test(version)) {
    throw new Error("Upload version can only contain letters, numbers, and dots.")
  }

  const timeZone = parsed["time-zone"] ?? env.WEAPP_UPLOAD_TIME_ZONE ?? defaultTimeZone
  const desc =
    parsed.desc ??
    env.WEAPP_UPLOAD_DESC ??
    `VekUI WeApp demo upload ${formatUploadTime(now, timeZone)}`
  const project = resolveFromRepo(root, parsed.project ?? env.WEAPP_UPLOAD_PROJECT ?? defaultProject)
  const cli = parsed.cli ?? env.WECHAT_DEVTOOLS_CLI ?? defaultWechatDevtoolsCli(platform)
  const infoOutput = parsed["info-output"]
    ? resolveFromRepo(root, parsed["info-output"])
    : env.WEAPP_UPLOAD_INFO_OUTPUT
      ? resolveFromRepo(root, env.WEAPP_UPLOAD_INFO_OUTPUT)
      : undefined
  const port = parsed.port ?? env.WECHAT_DEVTOOLS_PORT
  const lang = parsed.lang ?? env.WECHAT_DEVTOOLS_LANG

  return {
    help: false,
    build: parsed.build,
    cli,
    debug: parsed.debug,
    desc,
    dryRun: parsed.dryRun,
    infoOutput,
    lang,
    port,
    project,
    timeZone,
    version
  }
}

function buildUploadArgs(options) {
  const args = [
    "upload",
    "--project",
    options.project,
    "--version",
    options.version,
    "--desc",
    options.desc
  ]

  if (options.infoOutput) {
    args.push("--info-output", options.infoOutput)
  }
  if (options.port) {
    args.push("--port", String(options.port))
  }
  if (options.lang) {
    args.push("--lang", options.lang)
  }
  if (options.debug) {
    args.push("--debug")
  }

  return args
}

export function createMiniprogramUploadPlan({
  repoRoot: root = repoRoot,
  argv = process.argv.slice(2),
  env = process.env,
  now = new Date(),
  platform = process.platform
} = {}) {
  const options = normalizeUploadOptions({
    argv,
    env,
    now,
    platform,
    root
  })

  if (options.help) {
    return {
      dryRun: options.dryRun,
      help: true,
      projectPath: undefined,
      steps: []
    }
  }

  const steps = []
  if (options.build) {
    steps.push({
      label: "Build mini program",
      command: "pnpm",
      args: ["build:miniprogram"],
      cwd: root
    })
  }

  steps.push({
    label: "Upload mini program",
    command: options.cli,
    args: buildUploadArgs(options),
    cwd: root
  })

  return {
    distRoot: path.join(options.project, "dist"),
    dryRun: options.dryRun,
    help: false,
    options,
    projectPath: options.project,
    steps
  }
}

function shellQuote(value) {
  if (/^[A-Za-z0-9_./:=@-]+$/.test(value)) {
    return value
  }

  return `'${value.replaceAll("'", "'\\''")}'`
}

export function formatStepCommand(step) {
  return [step.command, ...step.args].map(shellQuote).join(" ")
}

async function ensureReadableFile(filePath, message) {
  try {
    await access(filePath)
  } catch {
    throw new Error(message)
  }
}

export async function ensureMiniprogramDist(projectPath) {
  await ensureReadableFile(
    path.join(projectPath, "dist/app.json"),
    `Mini program dist is missing at ${path.join(
      projectPath,
      "dist"
    )}. Run pnpm build:miniprogram before uploading.`
  )
}

async function runStep(step) {
  console.log(`[upload:miniprogram] ${step.label}`)

  await new Promise((resolve, reject) => {
    const child = spawn(step.command, step.args, {
      cwd: step.cwd,
      stdio: "inherit"
    })

    child.on("error", reject)
    child.on("exit", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${step.label} failed with exit code ${code}.`))
    })
  })
}

export async function runMiniprogramUploadPlan(plan) {
  if (plan.help) {
    console.log(getMiniprogramUploadHelp())
    return
  }

  if (plan.dryRun) {
    for (const step of plan.steps) {
      console.log(formatStepCommand(step))
    }
    return
  }

  for (const step of plan.steps) {
    if (step.label === "Upload mini program") {
      await ensureMiniprogramDist(plan.projectPath)
    }
    await runStep(step)
  }
}

export function getMiniprogramUploadHelp() {
  return `Upload the VekUI demo mini program through WeChat DevTools CLI.

Usage:
  pnpm upload:miniprogram -- --version 1.0.1
  pnpm upload:miniprogram -- --version 1.0.1 --desc "release smoke"

Options:
  --version, -v       Required. WeChat upload version, or WEAPP_UPLOAD_VERSION.
  --desc, -d          Upload description. Defaults to a timestamped VekUI note.
  --project           Project path. Defaults to apps/miniprogram.
  --cli               WeChat DevTools CLI path, or WECHAT_DEVTOOLS_CLI.
  --info-output, -i   Write WeChat upload info JSON to this path.
  --port              WeChat DevTools automation port.
  --lang              WeChat DevTools language, for example zh or en.
  --time-zone         Timestamp time zone for the default description.
  --no-build          Upload the current dist without running build:miniprogram.
  --dry-run           Print the build/upload commands without running them.
`
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const plan = createMiniprogramUploadPlan()
    await runMiniprogramUploadPlan(plan)
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }
}
