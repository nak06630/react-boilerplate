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
    <>
      <Stack spacing={2} sx={{ mx: 2 }}>
        <Box display="flex">
          <TextField
            sx={{ mr: 2, flex: 3 }}
            size="small"
            label="param1"
            {...register(`items.${mainIndex}.subs.${index}.param1`, {
              maxLength: { value: 10, message: '⚠ param1が10文字を超えています' }
            })}
          />
          <TextField
            sx={{ mr: 2, flex: 2 }}
            size="small"
            label="param2"
            {...register(`items.${mainIndex}.subs.${index}.param2`, {
              maxLength: { value: 10, message: '⚠ param2が10文字を超えています' }
            })}
          />
          <TextField
            sx={{ mr: 2, flex: 2 }}
            size="small"
            label="param3"
            {...register(`items.${mainIndex}.subs.${index}.param3`, {
              maxLength: { value: 10, message: '⚠ param3が10文字を超えています' }
            })}
          />
          <TextField
            sx={{ mr: 2, flex: 2 }}
            size="small"
            label="param4"
            {...register(`items.${mainIndex}.subs.${index}.param4`, {
              maxLength: { value: 10, message: '⚠ param4が10文字を超えています' }
            })}
          />
          <IconButton aria-label="delete" color="primary" onClick={() => deleteSubItem()}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box color="error.main" fontSize={12}>
          <ErrorMessage errors={errors} name={`items.${mainIndex}.subs.${index}.param1`} render={({ message }) => <p>{message}</p>} />
          <ErrorMessage errors={errors} name={`items.${mainIndex}.subs.${index}.param2`} render={({ message }) => <p>{message}</p>} />
          <ErrorMessage errors={errors} name={`items.${mainIndex}.subs.${index}.param3`} render={({ message }) => <p>{message}</p>} />
          <ErrorMessage errors={errors} name={`items.${mainIndex}.subs.${index}.param4`} render={({ message }) => <p>{message}</p>} />
        </Box>
      </Stack>
    </>
  )
}
