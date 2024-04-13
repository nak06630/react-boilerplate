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
  option1: boolean
  option1name?: string
}

const loadValue = {
  main: [
    // def
    { id: '11', name: '33', sel: '', check1: true, check2: false, option1: true, option1name: 'aaa' },
    { id: '22', name: '44', sel: '', check1: false, check2: true, option1: false }
  ]
}

const initValue = { id: '', name: '', sel: '', check1: false, check2: false, option1: false }

export default function Forms() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm<FormType>({
    defaultValues: loadValue,
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
        <CardHeader title="MultiFormサンプル2" subheader="MainItemを1つまたは複数設定してください。" />
        <CardContent>
          <Stack spacing={2}>
            {fields.map((_field, index) => (
              <MainItem
                key={index}
                fields={fields}
                register={register}
                control={control}
                mainIndex={index}
                delete={() => deleteMainItem(index)}
                errors={errors}
              />
            ))}
          </Stack>
          <Button sx={{ mt: 1 }} startIcon={<AddIcon />} color="primary" onClick={() => append(initValue)}>
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
