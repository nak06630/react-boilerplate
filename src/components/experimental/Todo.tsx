import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

interface todo {
  id: string
  title: string
}

/** GETの処理 */
const getPosts = async () => {
  const res: AxiosResponse<todo[], Error> = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return res.data
}

const Todo = () => {
  const [name, setName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(name)
  }

  const {
    isLoading,
    isError,
    data: todos,
    error
  } = useQuery<todo[]>({
    queryKey: ['todos'],
    queryFn: getPosts
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    if (error instanceof Error) return <span>Error: {error.message}</span>
    return <span>Error: {String(error)}</span>
  }

  return (
    <>
      <h1>Todo一覧</h1>
      <div>
        <form onSubmit={handleSubmit}>
          Add Todo :
          <input placeholder="Add New Todo" value={name} onChange={handleChange} />
          <button>追加</button>
        </form>
      </div>
      <ul>{todos?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
    </>
  )
}

export default Todo
