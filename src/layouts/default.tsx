import React, { useState, ReactElement } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { AppBar, Toolbar, Drawer, Menu, MenuItem } from '@mui/material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'

import { useRecoilState } from 'recoil'
import { currentUserState } from '@/store/user'
import { Auth } from '@aws-amplify/auth'
import awsconfig from '@/aws-exports'

Auth.configure(awsconfig)

type LayoutProps = Required<{
  readonly children: ReactElement
}>

const title = process.env.NEXT_PUBLIC_TITLE
const drawerWidth = 240

export default function Layout({ children }: LayoutProps) {
  const [user] = useRecoilState(currentUserState)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const signOut = async () => {
    try {
      await Auth.signOut()
      navigate('/')
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  const itemslist = [
    { text: 'Profile', icon: <AccountCircleIcon />, onclick: () => navigate('/accounts/') },
    { text: 'Home', icon: <HomeIcon />, onclick: () => navigate('/groups/') },
    { text: 'Map', icon: <InfoIcon />, onclick: () => navigate('/groups/map/') },
    { text: 'Chart', icon: <InfoIcon />, onclick: () => navigate('/groups/chart/') }
  ]

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            {user?.signInUserSession.idToken.payload.email}
            {
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => signOut}>Sign out</MenuItem>
                </Menu>
              </div>
            }
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
          }}
        >
          <Toolbar />
          <List>
            {itemslist.map((item) => {
              const { text, icon, onclick } = item
              return (
                <ListItemButton key={text} onClick={onclick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              )
            })}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <main>{children}</main>
        </Box>
      </Box>
    </>
  )
}
