import { Box, Stack, TextField, IconButton, Accordion, AccordionSummary, AccordionDetails, MenuItem } from '@mui/material'
import { FormGroup, FormControlLabel, FormControl, FormLabel, Checkbox } from '@mui/material'

import { Delete as DeleteIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material'
import { Control, UseFormRegister, FieldErrors, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { FormType } from './index.tsx'
import { ChangeEvent, useState } from 'react'

type Props = {
  mainIndex: number
  register: UseFormRegister<FormType>
  control: Control<FormType>
  delete: () => void
  errors: FieldErrors
}

const currencies = [
  { value: 'USD', label: '$' },
  { value: 'EUR', label: '€' },
  { value: 'BTC', label: '฿' },
  { value: 'JPY', label: '¥' }
]

export const MainItem = ({ register, delete: deleteMainItem, mainIndex, control, errors }: Props) => {
  const [chk, setChk] = useState(false)
  const hndlChk1 = (event: ChangeEvent<HTMLInputElement>) => {
    setChk(event.target.checked)
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
                <Controller
                  name={`main.${mainIndex}.sel`}
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
                <IconButton aria-label="delete" color="primary" onClick={() => deleteMainItem()}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box color="error.main" fontSize={12}>
                <ErrorMessage errors={errors} name={`main.${mainIndex}.id`} render={({ message }) => <p>{message}</p>} />
                <ErrorMessage errors={errors} name={`main.${mainIndex}.name`} render={({ message }) => <p>{message}</p>} />
                <ErrorMessage errors={errors} name={`main.${mainIndex}.sel`} render={({ message }) => <p>{message}</p>} />
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <FormControl component="fieldset" variant="standard">
                <FormLabel sx={{ fontSize: '0.7rem' }}>チェックボックス</FormLabel>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox />} label="check1" {...register(`main.${mainIndex}.check1`)} />
                  <FormControlLabel control={<Checkbox />} label="check2" {...register(`main.${mainIndex}.check2`)} />
                </FormGroup>
              </FormControl>
              <FormGroup>
                <FormControlLabel control={<Checkbox onChange={hndlChk1} />} label="追加項目" />
              </FormGroup>
              {chk && (
                <TextField
                  sx={{ mr: 2, flex: 3 }}
                  size="small"
                  label="オプション"
                  {...register(`main.${mainIndex}.option`, {
                    required: '⚠ 名前を入力してください',
                    pattern: {
                      value: /^\d+$/,
                      message: '⚠ 名前を数字で入力してください'
                    },
                    maxLength: { value: 10, message: '⚠ 名前が10文字を超えています' }
                  })}
                />
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  )
}
