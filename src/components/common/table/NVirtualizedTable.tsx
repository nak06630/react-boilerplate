/* eslint-disable react/display-name */
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableVirtuoso } from 'react-virtuoso'

export type RowData = {
  id: number
} & Record<string, React.ReactNode>

export type ColumnData = {
  field: keyof RowData
  headerName: string
  type?: string
  width: number
}

type TableProps = {
  rows: RowData[]
  columns: ColumnData[]
}

export default function VirtualizedTable({ columns, rows }: TableProps) {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={{
          Scroller: React.forwardRef<HTMLDivElement>((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
          Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
          TableHead: React.forwardRef((props, ref) => <TableHead {...props} sx={{ boxShadow: 0 }} ref={ref} />),
          TableRow: ({ ...props }) => <TableRow {...props} />,
          TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />)
        }}
        fixedHeaderContent={() => (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                variant="head"
                align={column.type || column.type === 'number' ? 'right' : 'left'}
                style={{ width: column.width }}
                sx={{
                  backgroundColor: 'background.paper'
                }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        )}
        itemContent={(_index: number, row: RowData) => (
          <React.Fragment>
            {columns.map((column) => (
              <TableCell key={column.field} align={column.type || column.type === 'number' ? 'right' : 'left'}>
                {row[column.field]}
              </TableCell>
            ))}
          </React.Fragment>
        )}
      />
    </Paper>
  )
}
