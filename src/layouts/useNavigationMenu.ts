import { useState, useEffect } from 'react'
import { NavigationItem } from './NavigationList'
import { Dashboard } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { ExperimentalMenu } from '@/pages/experimental/index'

// pages/experimnental/componentsに実験用のコンポーネントをおいてここに追加する。
export const useNavigationMenu = () => {
  const { pathname } = useLocation()
  const [items, setItems] = useState<NavigationItem[]>([])

  useEffect(() => {
    if (pathname.match(/^\/experimental\//)) {
      setItems(ExperimentalMenu)
      return
    }

    /* アカウント */
    const accounts = pathname.match(/^\/main\//)
    if (accounts) {
      setItems([
        { title: 'アカウント', icon: Dashboard, href: `/accounts/` },
        { title: 'ダッシュボード', icon: Dashboard, href: `/main/` }
      ])
      return
    }
  }, [pathname])

  return { items }
}
