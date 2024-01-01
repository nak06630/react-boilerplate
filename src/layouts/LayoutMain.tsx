import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '@/store/user'
import { AppBar, Toolbar, Menu, MenuItem, Box, Typography, IconButton } from '@mui/material'
import { Drawer } from '@mui/material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Amplify } from 'aws-amplify'
import awsconfig from '@/aws-exports'
import { signOut } from 'aws-amplify/auth'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

Amplify.configure(awsconfig as any)
const drawerWidth = 240
const title = process.env.VITE_TITLE

export default function LayoutMain() {
  const [user] = useRecoilState(userState)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  useEffect(() => {
    if (!user) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {
            <>
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
              </Menu>
            </>
          }
        </Toolbar>
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
