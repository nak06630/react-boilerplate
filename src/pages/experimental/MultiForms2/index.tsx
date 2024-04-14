import { useState } from 'react'
import { Box, Grid, Stack, Button } from '@mui/material'
import { Card, CardHeader, CardContent, CardActions } from '@mui/material'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { Add as AddIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material'
import { useForm, useFieldArray } from 'react-hook-form'
import { MainItem } from './MainItem'

export type FormType = {
  items: MainType[]
}

type MainType = {
  id: string
  name: string
  sel: string
  check1: boolean
  check2: boolean
  option1: boolean
  radio1: string
  option1name?: string
}

const defaultValues = {
  items: [
    { id: '11', name: '33', sel: '', check1: true, check2: false, radio1: 'female', option1: true, option1name: 'aaa' },
    { id: '22', name: '44', sel: '', check1: false, check2: true, radio1: 'male', option1: false }
  ]
}

const initValue = { id: '', name: '', sel: '', check1: false, check2: false, radio1: 'male', option1: false }

export default function Forms() {
  const [result, setResult] = useState(defaultValues)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm<FormType>({
    defaultValues,
    mode: 'onBlur'
  })

  const { fields, append, remove } = useFieldArray({ name: 'items', control })

  const onSubmit = (data: FormType) => {
    for (const item of data.items) {
      if (!item.option1) {
        item.option1name = undefined
      }
    }
    setResult(data)
  }

  const deleteMainItem = (index: number) => {
    remove(index)
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={4}>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader title="MultiFormサンプル2" subheader="MainItemを1つまたは複数設定してください。" />
            <CardContent>
              <Stack spacing={2}>
                {fields.map((_field, index) => (
                  <Accordion defaultExpanded key={index}>
                    <AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="panel1-content" id="panel1-header">
                      No. {index + 1}
                    </AccordionSummary>
                    <AccordionDetails>
                      <MainItem fields={fields} register={register} control={control} mainIndex={index} delete={() => deleteMainItem(index)} errors={errors} />
                    </AccordionDetails>
                  </Accordion>
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
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardHeader title="Debug" />
          <CardContent>
            <Box sx={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
