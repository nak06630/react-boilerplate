import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Alert, type AlertColor, Button, Card, CardHeader, CardContent, CardActions, Stack, TextField } from '@mui/material'
import { Amplify } from 'aws-amplify'
import { resetPassword, confirmResetPassword, type ConfirmResetPasswordInput } from 'aws-amplify/auth'
import awsconfig from '@/aws-exports'

Amplify.configure(awsconfig as any)

interface Alert {
  severity: AlertColor
  message: string
}

export default function CardSignIn() {
  const [step, setStep] = useState(1)
  const [alert, setAlert] = useState<Alert | null>(null)
  const [username, setUsername] = useState('')

  // step1
  interface FormInput {
    username: string
  }

  const schema = yup.object({
    username: yup.string().required('⚠ メールアドレスを入力してください').email('⚠ メールアドレス形式で入力してください')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>({ resolver: yupResolver(schema) })

  const handleResetPassword = async (username: string) => {
    try {
      await resetPassword({ username })
      setAlert({ severity: 'success', message: 'メールを送信しました。' })
      setUsername(username)
      setStep(2)
    } catch (error: any) {
      const { name, message }: { name?: string; message?: string } = error
      switch (name) {
        // 「ユーザー存在エラーの防止」の場合には失敗しない。
        case 'UserNotFoundException':
        case 'NotAuthorizedException':
          setAlert({ severity: 'error', message: 'ユーザー名またはパスワードが違います。' })
          break
        default:
          setAlert({ severity: 'error', message: name + ' : ' + message })
      }
    }
  }

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    //https://docs.amplify.aws/react/build-a-backend/auth/manage-mfa/
    await handleResetPassword(data.username)
  }

  // step2
  interface FormInput2 {
    confirmationCode: string
    newPassword: string
  }

  const schema2 = yup.object({
    confirmationCode: yup
      .string()
      .required('⚠ コードを入力してください')
      .matches(/^[0-9]{6}$/, '⚠ コードの形式が不正です'),
    newPassword: yup
      .string()
      .required('⚠ パスワードを入力してください')
      .matches(/^(?=.*[!-/:-@[-`{-~])(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[!-~]{8,}$/, '⚠ パスワードの形式が不正です')
  })

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 }
  } = useForm<FormInput2>({
    resolver: yupResolver(schema2)
  })

  const handleConfirmResetPassword = async ({ username, confirmationCode, newPassword }: ConfirmResetPasswordInput) => {
    try {
      await confirmResetPassword({ username, confirmationCode, newPassword })
      setAlert({ severity: 'success', message: 'パスワードを更新しました。' })
    } catch (error: any) {
      const { name, message }: { name?: string; message?: string } = error
      switch (name) {
        case 'CodeMismatchException':
          // Invalid verification code provided, please try again.
          setAlert({ severity: 'error', message: 'コードが一致しません。' })
          // step1に戻さない。
          break
        case 'LimitExceededException':
          // Attempt limit exceeded, please try after some time.
          setAlert({ severity: 'error', message: '実行回数が制限を超えています。時間をおいて実行してください。' })
          setStep(1)
          break
        default:
          setAlert({ severity: 'error', message: name + ' : ' + message })
          setStep(1)
      }
    }
  }

  const onSubmit2: SubmitHandler<FormInput2> = async (data) => {
    await handleConfirmResetPassword({ username: username, ...data } as ConfirmResetPasswordInput)
  }

  return (
    <Card sx={{ p: 4, width: '600px', m: '20px auto' }}>
      {alert && (
        <Alert
          severity={alert.severity}
          onClose={() => {
            setAlert(null)
          }}
        >
          {alert.message}
        </Alert>
      )}
      {step == 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title="パスワード再発行" subheader="登録されているユーザーID（メールアドレス）を入力してください。"></CardHeader>
          <CardContent>
            <Stack spacing={3}>
              <TextField
                label="ユーザーID"
                type="email"
                size="small"
                {...register('username')}
                error={'username' in errors}
                helperText={errors.username?.message}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button type="submit" color="primary" variant="contained">
              メール送信
            </Button>
            <Button sx={{ mx: 1 }} color="inherit" variant="contained" component={Link} to="/">
              戻る
            </Button>
          </CardActions>
        </form>
      )}
      {step == 2 && (
        <form onSubmit={handleSubmit2(onSubmit2)}>
          <CardHeader title="パスワード再発行" subheader="メールに記載されている6桁のコードを入力してください。"></CardHeader>
          <CardContent>
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
                label="コード"
                type="code"
                size="small"
                {...register2('confirmationCode')}
                error={'confirmationCode' in errors2}
                helperText={errors2.confirmationCode?.message}
              />
              <TextField
                label="パスワード"
                type="password"
                size="small"
                {...register2('newPassword')}
                error={'password' in errors2}
                helperText={errors2.newPassword?.message}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button type="submit" color="primary" variant="contained">
              再設定
            </Button>
            <Button sx={{ mx: 1 }} color="inherit" variant="contained" component={Link} to="/">
              戻る
            </Button>
          </CardActions>
        </form>
      )}
    </Card>
  )
}
