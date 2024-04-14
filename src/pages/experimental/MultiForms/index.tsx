import { useState } from 'react'
import { Grid, Box, Card, CardHeader, CardContent, CardActions, Button, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { Add as AddIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material'
import { useForm, useFieldArray } from 'react-hook-form'
import { MainItem } from './MainItem'

export type FormType = {
  items: MainType[]
}

type MainType = {
  id: string
  name: string
  subs: SubType[]
}

type SubType = {
  param1?: string
  param2?: string
  param3?: string
  param4?: string
}

const defaultValues = { items: [{ id: '', name: '', subs: [] }] }

const initValue = { id: '', name: '', subs: [] }

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

  const onSubmit = (data: any) => {
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
            <CardHeader title="MultiFormサンプル" subheader="MainItemを1つまたは複数設定してください。MainItemはSubItemを複数設定することができます。" />
            <CardContent>
              <Stack spacing={2}>
                {fields.map((_field, index) => (
                  <Accordion defaultExpanded key={index}>
                    <AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="panel1-content" id="panel1-header">
                      No. {index + 1}
                    </AccordionSummary>
                    <AccordionDetails>
                      <MainItem register={register} control={control} mainIndex={index} delete={() => deleteMainItem(index)} errors={errors} />
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
