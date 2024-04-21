import { Dispatch, SetStateAction, useMemo } from 'react'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable, flexRender, Row } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableRow, Icon, TableContainer, Paper } from '@mui/material'
import DragIndicator from '@mui/icons-material/DragIndicator'

type Props = {
  columns: ColumnDef<any>[]
  data: any[]
  setData: Dispatch<SetStateAction<any[]>>
}

const DraggableTableRow = ({ row }: { row: Row<any> }) => {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    id: row.original.index
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition
  }
  return (
    <TableRow ref={setNodeRef} style={style} key={row.id}>
      {row.getVisibleCells().map((cell, i) => {
        if (i === 0) {
          return (
            <TableCell key={cell.id}>
              <Icon {...attributes} {...listeners}>
                <DragIndicator />
              </Icon>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          )
        }
        return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      })}
    </TableRow>
  )
}

export default function NDraggableTable({ columns, data, setData }: Props) {
  const items = useMemo<UniqueIdentifier[]>(() => data?.map(({ index }) => index), [data])
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440, overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  <DraggableTableRow key={row.original.index} row={row} />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </DndContext>
  )
}
