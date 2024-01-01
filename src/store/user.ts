import { atom } from 'recoil'

type JwtPayload = {
  sub: string
  'cognito:username': string
  name: string
  email: string
  email_verified: boolean
  phone_number: string
  auth_time: number
  iat: number
  exp: number
}
type IdToken = {
  token: string
  payload: JwtPayload
}
export const userState = atom<IdToken | null>({
  key: 'userState',
  default: null
})
