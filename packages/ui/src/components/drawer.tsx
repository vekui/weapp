import { Sheet, type SheetContentProps, type SheetRootProps } from "./sheet"

export type DrawerRootProps = SheetRootProps
export type DrawerContentProps = Omit<SheetContentProps, "side"> & {
  side?: "left" | "right"
}

function DrawerRoot(props: DrawerRootProps) {
  return <Sheet.Root {...props} />
}

function DrawerContent({ side = "left", ...props }: DrawerContentProps) {
  return <Sheet.Content side={side} {...props} />
}

export const Drawer = {
  Root: DrawerRoot,
  Content: DrawerContent,
  Title: Sheet.Title,
  Description: Sheet.Description,
  Close: Sheet.Close
}
