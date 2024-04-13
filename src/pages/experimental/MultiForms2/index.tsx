import { Card, CardHeader, CardContent, CardActions, Button, Stack } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useForm, useFieldArray } from 'react-hook-form'
import { MainItem } from './MainItem'

export type FormType = {
  main: MainType[]
}

type MainType = {
  id: string
  name: string
  sel: string
  check1: boolean
  check2: boolean
  option?: boolean
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm<FormType>({
    defaultValues: { main: [{ id: '', name: '', sel: '', check1: false, check2: false }] },
    mode: 'onBlur'
  })

  const { fields, append, remove } = useFieldArray({ name: 'main', control })

  const onSubmit = (data: FormType) => {
    console.log(data)
  }

  const deleteMainItem = (index: number) => {
    remove(index)
  }

  return (
    <Card sx={{ maxWidth: 1000, m: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="MultiFormサンプル" subheader="MainItemを1つまたは複数設定してください。MainItemはSubItemを複数設定することができます。" />
        <CardContent>
          <Stack spacing={2}>
            {fields.map((_field, index) => (
              <MainItem key={index} register={register} control={control} mainIndex={index} delete={() => deleteMainItem(index)} errors={errors} />
            ))}
          </Stack>
          <Button sx={{ mt: 1 }} startIcon={<AddIcon />} color="primary" onClick={() => append({ id: '', name: '', sel: '', check1: false, check2: false })}>
            グループを追加する
          </Button>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary" disabled={!isDirty || !isValid}>
            送信
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
