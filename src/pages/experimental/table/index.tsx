import * as React from 'react'
import { Box, Tabs, Tab } from '@mui/material/'
import BasicReactTable from './BasicReactTable'
import NVirtualizedTable from './NVirtualizedTable'
import DndTable from './DndTable'
import DraggableTable from './DraggableTable'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Table() {
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item1" {...a11yProps(0)} />
          <Tab label="Item2" {...a11yProps(1)} />
          <Tab label="Item3" {...a11yProps(2)} />
          <Tab label="Item4" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BasicReactTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NVirtualizedTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DndTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <DraggableTable />
      </CustomTabPanel>
    </>
  )
}
