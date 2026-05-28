import { z } from "zod"

export const registryFileSchema = z.object({
  content: z.string(),
  path: z.string(),
  type: z.enum(["registry:component", "registry:lib", "registry:style"])
})

export const registryItemSchema = z.object({
  $schema: z.string(),
  dependencies: z.record(z.string(), z.string()).optional(),
  description: z.string(),
  files: z.array(registryFileSchema),
  name: z.string(),
  registryDependencies: z.array(z.string()).optional(),
  title: z.string(),
  type: z.enum(["registry:ui", "registry:lib", "registry:style"])
})

export const registryIndexSchema = z.object({
  $schema: z.string(),
  homepage: z.string(),
  items: z.array(
    z.object({
      description: z.string(),
      name: z.string(),
      registryDependencies: z.array(z.string()).optional(),
      title: z.string(),
      type: z.enum(["registry:ui", "registry:lib", "registry:style"])
    })
  ),
  name: z.string()
})

export type BuiltRegistryItem = z.infer<typeof registryItemSchema>
export type BuiltRegistryIndex = z.infer<typeof registryIndexSchema>
