/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ChangeEvent, useState } from 'react'
import { Box, Stack, TextField, IconButton, MenuItem } from '@mui/material'
import { FormGroup, FormControlLabel, FormControl, FormLabel, Checkbox } from '@mui/material'
import { RadioGroup, Radio } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { Control, UseFormRegister, FieldValues, FieldErrors, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { FormType } from './index.tsx'

type Props = {
  fields: FieldValues
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

export const MainItem = ({ fields, register, delete: deleteMainItem, mainIndex, control, errors }: Props) => {
  const [option1, setOption1] = useState(fields[mainIndex].option1)
  const handleOption1 = (event: ChangeEvent<HTMLInputElement>) => {
    setOption1(event.target.checked)
  }

  return (
    <Stack spacing={1}>
      <Box display="flex">
        <TextField
          sx={{ mr: 2, flex: 3 }}
          size="small"
          label="ID"
          required
          {...register(`items.${mainIndex}.id`, {
            required: '⚠ IDを入力してください',
            pattern: { value: /^\d+$/, message: '⚠ IDを数字で入力してください' },
            maxLength: { value: 10, message: '⚠ IDが10文字を超えています' }
          })}
        />
        <TextField
          sx={{ mr: 2, flex: 3 }}
          size="small"
          label="名前"
          required
          {...register(`items.${mainIndex}.name`, {
            pattern: { value: /^.{1,10}$/, message: '⚠ 名前を入力してください' },
            maxLength: { value: 10, message: '⚠ 名前が10文字を超えています' }
          })}
        />
        <Controller
          name={`items.${mainIndex}.sel`}
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

      <FormControl component="fieldset" variant="standard">
        <FormLabel sx={{ fontSize: '0.7rem' }}>チェックボックス</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Controller
                name={`items.${mainIndex}.check1`}
                control={control}
                render={({ field }) => <Checkbox {...field} checked={field.value} size="small" />}
              />
            }
            label="check1"
          />
          <FormControlLabel
            control={
              <Controller
                name={`items.${mainIndex}.check2`}
                control={control}
                render={({ field }) => <Checkbox {...field} checked={field.value} size="small" />}
              />
            }
            label="check2"
          />
        </FormGroup>
      </FormControl>
      <Controller
        name={`items.${mainIndex}.radio1`}
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
      {/* チェックボックス＋追加項目 */}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox size="small" onChange={handleOption1} defaultChecked={fields[mainIndex].option1} />}
          {...register(`items.${mainIndex}.option1`)}
          label="追加項目"
        />
      </FormGroup>
      {option1 && (
        <TextField
          sx={{ mr: 2, flex: 3 }}
          size="small"
          label="オプション"
          {...register(`items.${mainIndex}.option1name`, {
            required: '⚠ 名前を入力してください',
            maxLength: { value: 10, message: '⚠ 名前が10文字を超えています' }
          })}
        />
      )}
    </Stack>
  )
}
