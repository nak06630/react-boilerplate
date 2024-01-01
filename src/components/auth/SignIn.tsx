import { useState } from 'react'
import { Alert, Button, Card, CardHeader, CardContent, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Amplify } from 'aws-amplify'
import awsconfig from '@/aws-exports'
import { useSetRecoilState } from 'recoil'
import { userState } from '@/store/user'
import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signIn } from 'aws-amplify/auth'
import { fetchAuthSession, signOut, confirmSignIn } from 'aws-amplify/auth'

Amplify.configure(awsconfig as any)

interface FormInput {
  username: string
  password: string
}

const schema = yup.object({
  username: yup.string().required('⚠ メールアドレスを入力してください').email('⚠ メールアドレス形式で入力してください'),
  password: yup
    .string()
    .required('⚠ パスワードを入力してください')
    .matches(/^(?=.*[!-/:-@[-`{-~])(?=.*[0-9])(?=.*[a-z])[!-~]{8,}$/, '⚠ パスワードの形式が不正です')
})

export default function CardSignIn() {
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState)
  const [isAlert, setIsAlert] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>({
    resolver: yupResolver(schema)
  })

  const login = async () => {
    try {
      //https://docs.amplify.aws/react/build-a-backend/auth/manage-user-session/
      const { idToken } = (await fetchAuthSession()).tokens ?? {}
      //console.log(accessToken, idToken)
      const token = idToken?.toString() as string
      const payload = idToken?.payload as any
      setUser({ payload, token })
      navigate('/main/')
    } catch (err) {
      console.log(err)
    }
  }

  //https://docs.amplify.aws/react/build-a-backend/auth/manage-mfa/
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      await signOut()
      const { nextStep } = await signIn(data)
      if (nextStep.signInStep === 'DONE') {
        await login()
        return
      }
      if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
        const code = prompt('トークンを入力してください。')
        if (!code) {
          alert('コードは必須です。')
          return
        }
        await confirmSignIn({ challengeResponse: code })
        await login()
        return
      } else if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        // const { requiredAttributes } = user.challengeParam
        const newPassword = prompt('新しいパスワードを入力してください。')
        if (!newPassword) {
          alert('新しいパスワードは必須です。')
          return
        }
        //await handleCompleteNewPasswordChallenge(user, newPassword)
        navigate('/main/')
      } else {
        console.log(nextStep.signInStep)
      }
    } catch (error: any) {
      setIsAlert(true)
      const { name, message }: { name?: string; message?: string } = error
      switch (name) {
        case 'UserAlreadyAuthenticatedException':
          await login()
          break
        case 'UserNotFoundException':
        case 'NotAuthorizedException':
          setError('ユーザー名またはパスワードが違います。')
          break
        default:
          setError(name + ' : ' + message)
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
            <TextField
              label="ユーザーID"
              type="email"
              size="small"
              {...register('username')}
              error={'username' in errors}
              helperText={errors.username?.message}
            />
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
