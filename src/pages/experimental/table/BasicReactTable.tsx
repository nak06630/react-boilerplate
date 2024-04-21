import { useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/hooks/fetcher'
import BasicReactTable from '@/components/common/table/BasicReactPagenationTable'

const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => fetcher('get', 'https://jsonplaceholder.typicode.com/users', {})
  })
}

export default function SampleTable() {
  const { data, isLoading, error } = useFetchUsers()

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'First Name', size: 150 },
      { accessorKey: 'name', header: 'Last Name', size: 150 },
      { accessorKey: 'username', header: 'Address', size: 200 },
      { accessorKey: 'email', header: 'City', size: 150 }
    ],
    []
  )

  if (isLoading) return 'Loading...'
  if (error) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    return <span>Error: {String(error)}</span>
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title="ユーザ一覧" />
      <CardContent>
        <BasicReactTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}
