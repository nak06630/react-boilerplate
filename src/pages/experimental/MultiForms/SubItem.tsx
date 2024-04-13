import { Box, Stack, TextField, IconButton } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { FormType } from './index.tsx'

type Props = {
  index: number
  delete: () => void
  register: UseFormRegister<FormType>
  mainIndex: number
  errors: FieldErrors
}

export const SubItem = ({ index, delete: deleteSubItem, register, mainIndex, errors }: Props) => {
  return (
    <Box>
      <Stack spacing={2} sx={{ mx: 2 }}>
        <Box display="flex">
          <TextField
            sx={{ mr: 2, flex: 3 }}
            size="small"
            label="param1"
            {...register(`main.${mainIndex}.subs.${index}.param1`, {
              required: '⚠ param1を入力してください',
              pattern: {
                value: /^\d+$/,
                message: '⚠ param1を数字で入力してください'
              },
              maxLength: { value: 10, message: '⚠ param1が10文字を超えています' }
            })}
          />
          {/* 以下はダミー */}
          <TextField sx={{ mr: 2, flex: 2 }} size="small" label="param2" />
          <TextField sx={{ mr: 2, flex: 2 }} size="small" label="param3" />
          <TextField sx={{ mr: 2, flex: 2 }} size="small" label="param4" />
          <TextField sx={{ mr: 2, flex: 2 }} size="small" label="param5" />
          <IconButton aria-label="delete" color="primary" onClick={() => deleteSubItem()}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box color="error.main" fontSize={12}>
          <ErrorMessage errors={errors} name={`main.${mainIndex}.subs.${index}.param1`} render={({ message }) => <p>{message}</p>} />
        </Box>
      </Stack>
    </Box>
  )
}
