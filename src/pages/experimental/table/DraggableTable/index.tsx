import NDraggableTable from '../../components/DraggableTable/'
import { useState } from 'react'

export type Element = {
  index: string
  position: number
  name: string
  symbol: string
  mass: number
}
const columns = [
  { id: 'index', header: '#', accessorKey: 'index' },
  { id: 'position', header: 'position', accessorKey: 'position' },
  { id: 'name', header: 'name', accessorKey: 'name' },
  { id: 'symbol', header: 'symbol', accessorKey: 'symbol' },
  { id: 'mass', header: 'mass', accessorKey: 'mass' }
]

const rows = [
  { index: '', position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { index: '', position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { index: '', position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { index: '', position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { index: '', position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' }
]

const range = (len: number) => {
  const arr: Element[] = []
  for (let i = 0; i < len; i++) {
    arr.push({ ...rows[Math.floor(Math.random() * 5)], index: String(i) })
  }
  return arr
}

export default function App() {
  const [data, setData] = useState<Element[]>(range(100))

  return (
    <>
      <NDraggableTable columns={columns} data={data} setData={setData} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
