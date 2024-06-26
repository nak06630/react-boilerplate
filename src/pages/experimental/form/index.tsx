import * as React from 'react'
import { Box, Tabs, Tab } from '@mui/material/'
import SingleForm from './SingleForm'
import MultiForm from './MultiForm'
import MultiForm2 from './MultiForm2'

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

export default function Form() {
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
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SingleForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MultiForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MultiForm2 />
      </CustomTabPanel>
    </>
  )
}
