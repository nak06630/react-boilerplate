import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { currentUserState } from '@/store/user'

import { Box, AppBar, Drawer, Toolbar } from '@mui/material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'

export default function LayoutMain() {
  const [user] = useRecoilState(currentUserState)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const drawerWidth = 240
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">Title</Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
        <Toolbar variant="dense" />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>ダッシュボード</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar variant="dense" />
        <Outlet />
      </Box>
    </Box>
  )
}
