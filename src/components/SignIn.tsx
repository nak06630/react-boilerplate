import { useState } from 'react'
import { Alert, Button, Card, CardHeader, CardContent, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Auth } from 'aws-amplify'
import awsconfig from '@/aws-exports'
import { useSetRecoilState } from 'recoil'
import { currentUserState } from '@/store/user'
import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

Auth.configure(awsconfig)

interface SampleFormInput {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required('⚠ メールアドレスを入力してください').email('⚠ メールアドレス形式で入力してください'),
  password: yup
    .string()
    .required('⚠ パスワードを入力してください')
    .matches(/^(?=.*[!-/:-@[-`{-~])(?=.*[0-9])(?=.*[a-z])[!-~]{8,}$/, '⚠ パスワードの形式が不正です')
})

export default function CardSignIn() {
  const navigate = useNavigate()
  const setUser = useSetRecoilState(currentUserState)
  const [isAlert, setIsAlert] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SampleFormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<SampleFormInput> = async (data) => {
    try {
      const user = await Auth.signIn(data.email, data.password)
      setUser(user)

      const { challengeName } = user
      if (!challengeName) {
        navigate('/main/')
        return
      }

      // Todo:
      if (challengeName === 'SOFTWARE_TOKEN_MFA') {
        const code = prompt('トークンを入力してください。')
        if (!code) {
          alert('コードは必須です。')
          return
        }
        await Auth.confirmSignIn(user, code, 'SOFTWARE_TOKEN_MFA')
        navigate('/main/')
        // Todo:
      } else if (challengeName === 'NEW_PASSWORD_REQUIRED') {
        // const { requiredAttributes } = user.challengeParam
        const newPassword = prompt('新しいパスワードを入力してください。')
        if (!newPassword) {
          alert('新しいパスワードは必須です。')
          return
        }
        await Auth.completeNewPassword(user, newPassword)
        navigate('/main/')
      } else {
        console.log(challengeName)
      }
    } catch (error: any) {
      setIsAlert(true)
      const { code, message }: { code?: string; message?: string } = error
      switch (code) {
        case 'UserNotFoundException':
        case 'NotAuthorizedException':
          setError('ユーザー名またはパスワードが違います。')
          break
        default:
          setError('Unauthorized: ' + code + ' : ' + message)
      }
    }
  }

  return (
    <Card sx={{ p: 4, width: '480px', m: '20px auto' }}>
      {isAlert && (
        <Alert
          severity="error"
          onClose={() => {
            setIsAlert(false)
          }}
        >
          {error}
        </Alert>
      )}
      <CardHeader title="ログイン"></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField label="ユーザーID" type="email" size="small" {...register('email')} error={'email' in errors} helperText={errors.email?.message} />
            <TextField
              label="パスワード"
              type="password"
              size="small"
              {...register('password')}
              error={'password' in errors}
              helperText={errors.password?.message}
            />
            <Button type="submit" color="primary" variant="contained" size="large">
              ログイン
            </Button>
          </Stack>
        </form>
        <div>
          <Link href="/signup">signup</Link>
        </div>
        <div>
          <Link href="/forgotPassword">forgotPassword</Link>
        </div>
      </CardContent>
    </Card>
  )
}
