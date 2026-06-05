import path from "node:path"
import { pathToFileURL } from "node:url"
import { describe, expect, it } from "vitest"

const repoRoot = path.resolve(new URL("../../../../", import.meta.url).pathname)
const uploadScriptUrl = pathToFileURL(
  path.join(repoRoot, "scripts/upload-miniprogram.mjs")
).href

describe("miniprogram upload script", () => {
  it("builds before uploading the Taro playground through WeChat DevTools CLI", async () => {
    const { createMiniprogramUploadPlan } = await import(uploadScriptUrl)

    const plan = createMiniprogramUploadPlan({
      repoRoot,
      argv: ["--version", "1.0.1", "--desc", "release smoke"],
      env: {
        WECHAT_DEVTOOLS_CLI: "/tmp/wechat-cli"
      },
      now: new Date("2026-06-03T10:51:00.000Z")
    })

    expect(plan.steps).toEqual([
      {
        label: "Build mini program",
        command: "pnpm",
        args: ["build:miniprogram"],
        cwd: repoRoot
      },
      {
        label: "Upload mini program",
        command: "/tmp/wechat-cli",
        args: [
          "upload",
          "--project",
          path.join(repoRoot, "apps/miniprogram"),
          "--version",
          "1.0.1",
          "--desc",
          "release smoke"
        ],
        cwd: repoRoot
      }
    ])
  })

  it("uses environment and deterministic defaults for repeatable uploads", async () => {
    const { createMiniprogramUploadPlan } = await import(uploadScriptUrl)

    const plan = createMiniprogramUploadPlan({
      repoRoot,
      argv: [],
      env: {
        WEAPP_UPLOAD_VERSION: "1.0.2"
      },
      now: new Date("2026-06-03T10:51:00.000Z"),
      platform: "darwin"
    })

    expect(plan.steps[1]).toMatchObject({
      command: "/Applications/wechatwebdevtools.app/Contents/MacOS/cli",
      args: expect.arrayContaining([
        "--version",
        "1.0.2",
        "--desc",
        "VekUI WeApp demo upload 2026-06-03 18:51"
      ])
    })
  })

  it("ignores the pnpm argument separator before upload options", async () => {
    const { createMiniprogramUploadPlan } = await import(uploadScriptUrl)

    const plan = createMiniprogramUploadPlan({
      repoRoot,
      argv: ["--", "--version", "1.0.3", "--dry-run"],
      env: {},
      now: new Date("2026-06-03T10:51:00.000Z")
    })

    expect(plan.dryRun).toBe(true)
    expect(plan.steps[1]?.args).toContain("1.0.3")
  })

  it("requires an explicit upload version", async () => {
    const { createMiniprogramUploadPlan } = await import(uploadScriptUrl)

    expect(() =>
      createMiniprogramUploadPlan({
        repoRoot,
        argv: [],
        env: {},
        now: new Date("2026-06-03T10:51:00.000Z")
      })
    ).toThrow("Missing upload version")
  })
})
