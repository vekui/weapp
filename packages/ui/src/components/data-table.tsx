import * as React from "react"

import { cn } from "../lib/cn"
import { Box, type BoxProps } from "../primitives"
import { Table } from "./table"

export type DataTableColumn = {
  key: string
  title: React.ReactNode
}

export type DataTableRow = Record<string, React.ReactNode> & {
  id: string
  selected?: boolean
}

export type DataTableProps = BoxProps & {
  columns?: DataTableColumn[]
  rows?: DataTableRow[]
}

function DataTableCompat({ columns = [], rows = [], ...props }: DataTableProps) {
  return (
    <DataTableRoot {...props}>
      <DataTableHeader>
        <DataTableRowView>
          {columns.map((column) => (
            <DataTableCell key={column.key}>{column.title}</DataTableCell>
          ))}
        </DataTableRowView>
      </DataTableHeader>
      {rows.map((row) => (
        <DataTableRowView data-row-id={row.id} key={row.id} selected={row.selected}>
          {columns.map((column) => (
            <DataTableCell key={column.key}>{row[column.key]}</DataTableCell>
          ))}
        </DataTableRowView>
      ))}
    </DataTableRoot>
  )
}

export type DataTableRootProps = BoxProps

function DataTableRoot({ className, ...props }: DataTableRootProps) {
  return <Table.Root className={className} {...props} />
}

export type DataTableHeaderProps = BoxProps

function DataTableHeader({ className, ...props }: DataTableHeaderProps) {
  return <Table.Header className={className} {...props} />
}

export type DataTableRowProps = BoxProps & {
  selected?: boolean
}

function DataTableRowView({ className, selected, ...props }: DataTableRowProps) {
  return (
    <Table.Row
      className={cn(className)}
      data-state={selected ? "selected" : "default"}
      selected={selected}
      {...props}
    />
  )
}

function DataTableCell(props: React.ComponentProps<typeof Table.Cell>) {
  return <Table.Cell {...props} />
}

export const DataTable = Object.assign(DataTableCompat, {
  Root: DataTableRoot,
  Header: DataTableHeader,
  Row: DataTableRowView,
  Cell: DataTableCell
})
