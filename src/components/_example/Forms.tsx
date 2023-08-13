import { Card, CardHeader, CardContent, CardActions, styled, Button, Stack } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { NTextField } from '@/components/common/NTextField'
import { NRadioGroup } from '@/components/common/NRadioGroup'
import { NSelect } from '@/components/common/NSelect'
import { NCheckboxGroup } from '@/components/common/NCheckboxGroup'

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
  width: '100%',
  padding: '16px'
})

const schema = yup.object().shape({
  text: yup.string().required('1'),
  radio: yup.string().required('2'),
  select: yup.string().required('3'),
  checkbox: yup.array().min(1, '4')
})

type Inputs = {
  text: string
  radio: string
  select: string
  checkbox: string[]
}

const defaultValues: Inputs = {
  text: '',
  radio: 'apple',
  select: 'apple2',
  checkbox: []
}

const radio_props = [
  { label: 'りんご', value: 'apple' },
  { label: 'みかん', value: 'orange' },
  { label: 'ばなな', value: 'banana' }
]

const select_props = [
  { label: 'りんご2', value: 'apple2' },
  { label: 'みかん2', value: 'orange2' },
  { label: 'ばなな2', value: 'banana2' }
]

const checkbox_props = [
  { label: 'りんご3', value: 'apple3' },
  { label: 'みかん3', value: 'orange3' },
  { label: 'ばなな3', value: 'banana3' }
]

export default function Demo() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    // 通常であればAPIなどを呼び出しますが、今回はサンプルのためアラートを出します
    window.alert(JSON.stringify(data, null, 2))
  }

  return (
    <Card sx={{ maxWidth: 400, m: 5 }}>
      <CardHeader title="a" subheader="sample" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Stack spacing={3}>
            <NTextField label="メールアドレス" name="text" control={control} />
            <NRadioGroup label="らじお" name="radio" control={control} radioPropsList={radio_props} />
            <NSelect label="せれくと" name="select" control={control} selectPropsList={select_props} />
            <NCheckboxGroup label="ちぇっくぼっくす" name="checkbox" control={control} checkBoxPropsList={checkbox_props} />
          </Stack>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained">
            送信
          </Button>
          <Button onClick={() => reset()}>リセット</Button>
        </CardActions>
      </Form>
    </Card>
  )
}
