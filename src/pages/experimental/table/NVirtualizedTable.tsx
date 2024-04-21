import NVirtualizedTable, { type ColumnData, type RowData } from '@/components/common/table/NVirtualizedTable'

//const columns: GridColDef<(typeof rows)[number]>[] = [
const columns: ColumnData[] = [
  { field: 'dessert', headerName: 'Dessert', width: 200 },
  { field: 'calories', headerName: 'Calories\u00A0(g)', width: 120, type: 'number' },
  { field: 'fat', headerName: 'Fat\u00A0(g)', width: 120, type: 'number' },
  { field: 'carbs', headerName: 'Carbs\u00A0(g)', width: 120, type: 'number' },
  { field: 'protein', headerName: 'Protein\u00A0(g)', width: 120, type: 'number' }
]

const sample: RowData[] = [
  { id: 1, dessert: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { id: 2, dessert: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { id: 3, dessert: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { id: 4, dessert: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { id: 5, dessert: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 }
]
const rows = Array.from({ length: 2000 }, () => {
  return sample[Math.floor(Math.random() * sample.length)]
})

export default function ReactVirtualizedTable() {
  return <NVirtualizedTable columns={columns} rows={rows} />
}
