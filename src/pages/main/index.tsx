import { useRecoilValue } from 'recoil'
import { currentUserState } from '@/store/user'

export default function Main() {
  const user = useRecoilValue(currentUserState)
  return (
    <>
      <div>ログインしました。</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}
