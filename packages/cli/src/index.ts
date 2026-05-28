#!/usr/bin/env node
import { addCommand, doctorCommand, initCommand, listCommand, type CommandResult } from "./commands.js"

type Io = {
  stderr?: (line: string) => void
  stdout?: (line: string) => void
}

function print(result: CommandResult, io: Io) {
  const write = result.code === 0 ? io.stdout : io.stderr
  for (const line of result.lines) {
    write?.(line)
  }
}

export async function runCli(argv: string[], io: Io = {}) {
  const [command, ...rest] = argv
  let result: CommandResult

  try {
    if (command === "init") {
      result = await initCommand(rest)
    } else if (command === "add") {
      result = await addCommand(rest)
    } else if (command === "list") {
      result = await listCommand()
    } else if (command === "doctor") {
      result = await doctorCommand(rest)
    } else {
      result = {
        code: command === "--help" || command === "-h" ? 0 : 1,
        lines: [
          "Usage: vekui <command> [options]",
          "",
          "Commands:",
          "  init --cwd . --yes",
          "  add <component...> --cwd .",
          "  list",
          "  doctor --cwd ."
        ]
      }
    }
  } catch (error) {
    result = {
      code: 1,
      lines: [error instanceof Error ? error.message : String(error)]
    }
  }

  print(result, {
    stdout: io.stdout ?? console.log,
    stderr: io.stderr ?? console.error
  })

  return result.code
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli(process.argv.slice(2)).then((code) => {
    process.exit(code)
  })
}
