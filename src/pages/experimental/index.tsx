import { Routes, Route } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '@mui/material'
import { Dashboard, Map as MapIcon, Edit, Hub, LineAxis, TableRowsOutlined } from '@mui/icons-material'

import Form from './form/'
import Table from './table'
import Chart from './chart'
import Map from './map/Map'
import Vis from './vis/Vis'

/** NavigationMenu */
export const ExperimentalMenu = () => {
  return [
    { title: 'Top', icon: Dashboard, href: `/experimental` },
    { title: 'Form', icon: Edit, href: `/experimental/form` },
    { title: 'Table', icon: TableRowsOutlined, href: `/experimental/table` },
    { title: 'Chart', icon: LineAxis, href: `/experimental/chart` },
    { title: 'Map', icon: MapIcon, href: `/experimental/map` },
    { title: 'Vis', icon: Hub, href: `/experimental/vis` }
  ]
}

/** Router (path は、/experimental は省略) */
export const ExperimentalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExperimentalPage />} />
      <Route path="/form" element={<Form />} />
      <Route path="/table" element={<Table />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/map" element={<Map />} />
      <Route path="/vis" element={<Vis />} />
    </Routes>
  )
}

/** ExperimentalPage(TopPage) */
export default function ExperimentalPage() {
  return (
    <Card>
      <CardHeader title="Experimental" />
      <CardContent>左メニュー参照</CardContent>
    </Card>
  )
}
