import { useState } from 'react'
import { Box, Grid, Stack, Button } from '@mui/material'
import { CardHeader, CardContent, CardActions } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { TextField, MenuItem } from '@mui/material'
import { FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { RadioGroup, Radio } from '@mui/material'
import { FormGroup, Checkbox } from '@mui/material'
import { ErrorMessage } from '@hookform/error-message'
import { NCard, NCardHeader } from '@/components/common/card'

export type FormType = {
  items: MainType
}

type MainType = {
  name: string
  sel: string
  check1: boolean
  check2: boolean
  option1: boolean
  radio1: string
  option1name?: string
}

const currencies = [
  { value: 'USD', label: '$' },
  { value: 'EUR', label: '€' },
  { value: 'BTC', label: '฿' },
  { value: 'JPY', label: '¥' }
]

const defaultValues = {
  //items: { name: '33', sel: '', check1: true, check2: false, radio1: 'female' }
  items: { name: '', sel: '', check1: true, check2: false, radio1: 'female' }
}

export default function SingleForms() {
  const [result, setResult] = useState(defaultValues)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormType>({
    defaultValues,
    mode: 'onBlur'
  })

  const onSubmit = (data: FormType) => {
    setResult(data as any)
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={6}>
        <NCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <NCardHeader title="SingleFormサンプル" icon={<Settings />} subheader="単一のJSONを生成するフォームのサンプルです。 \n テスト" />
            <CardContent>
              <Stack spacing={2}>
                <Box display="flex">
                  <TextField
                    sx={{ mr: 2, flex: 3 }}
                    size="small"
                    label="Name"
                    required
                    {...register(`items.name`, {
                      required: '⚠ 名前を入力してください',
                      maxLength: { value: 10, message: '⚠ 名前が10文字を超えています' }
                    })}
                  />
                </Box>
                <Box color="error.main" fontSize={12}>
                  <ErrorMessage errors={errors} name={`items.name`} render={({ message }) => <p>{message}</p>} />
                  <ErrorMessage errors={errors} name={`items.sel`} render={({ message }) => <p>{message}</p>} />
                </Box>
                <Controller
                  name={`items.sel`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} sx={{ mr: 2, flex: 3 }} select size="small" label="Select" required>
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <FormControl component="fieldset" variant="standard">
                  <FormLabel sx={{ fontSize: '0.7rem' }}>チェックボックス</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Controller
                          name={`items.check1`}
                          control={control}
                          render={({ field }) => <Checkbox {...field} checked={field.value} size="small" />}
                        />
                      }
                      label="check1"
                    />
                    <FormControlLabel
                      control={
                        <Controller
                          name={`items.check2`}
                          control={control}
                          render={({ field }) => <Checkbox {...field} checked={field.value} size="small" />}
                        />
                      }
                      label="check2"
                    />
                  </FormGroup>
                </FormControl>
                <Controller
                  name={`items.radio1`}
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel sx={{ fontSize: '0.7rem' }}>ラジオグループ</FormLabel>
                      <RadioGroup {...field} row aria-label="gender">
                        <FormControlLabel value="female" control={<Radio size="small" />} label="Female" />
                        <FormControlLabel value="male" control={<Radio size="small" />} label="Male" />
                        <FormControlLabel value="other" control={<Radio size="small" />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" color="primary">
                送信
              </Button>
            </CardActions>
          </form>
        </NCard>
      </Grid>
      <Grid item xs={4}>
        <NCard>
          <NCardHeader title="Debug" />
          <CardContent>
            <Box sx={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</Box>
          </CardContent>
        </NCard>
      </Grid>
    </Grid>
  )
}
