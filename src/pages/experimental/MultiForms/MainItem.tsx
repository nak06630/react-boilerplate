import { Box, Button, Stack, TextField, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material'
import { Control, useFieldArray, UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { FormType } from './index.tsx'
import { SubItem } from './SubItem.tsx'

type Props = {
  mainIndex: number
  register: UseFormRegister<FormType>
  control: Control<FormType>
  delete: () => void
  errors: FieldErrors
}

export const MainItem = ({ register, delete: deleteMainItem, mainIndex, control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({ name: `main.${mainIndex}.subs`, control })

  const removeSubItem = (index: number) => {
    remove(index)
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="panel1-content" id="panel1-header">
            <Stack spacing={1}>
              <Box display="flex">
                <TextField
                  sx={{ mr: 2, flex: 3 }}
                  size="small"
                  label="ID"
                  required
                  {...register(`main.${mainIndex}.id`, {
                    required: '⚠ IDを入力してください',
                    pattern: {
                      value: /^\d+$/,
                      message: '⚠ IDを数字で入力してください'
                    },
                    maxLength: { value: 10, message: '⚠ IDが10文字を超えています' }
                  })}
                />
                <TextField
                  sx={{ mr: 2, flex: 3 }}
                  size="small"
                  label="名前"
                  required
                  {...register(`main.${mainIndex}.name`, {
                    required: '⚠ 名前を入力してください',
                    pattern: {
                      value: /^\d+$/,
                      message: '⚠ 名前を数字で入力してください'
                    },
                    maxLength: { value: 10, message: '⚠ 名前が10文字を超えています' }
                  })}
                />
                <IconButton aria-label="delete" color="primary" onClick={() => deleteMainItem()}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box color="error.main" fontSize={12}>
                <ErrorMessage errors={errors} name={`main.${mainIndex}.id`} render={({ message }) => <p>{message}</p>} />
                <ErrorMessage errors={errors} name={`main.${mainIndex}.name`} render={({ message }) => <p>{message}</p>} />
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              {fields.map((_field, index) => (
                <SubItem key={index} delete={() => removeSubItem(index)} mainIndex={mainIndex} index={index} register={register} errors={errors} />
              ))}
            </Stack>
            <Button sx={{ mt: 1 }} startIcon={<AddIcon />} color="primary" onClick={() => append({ param1: '' })}>
              SubItemを追加する
            </Button>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  )
}
