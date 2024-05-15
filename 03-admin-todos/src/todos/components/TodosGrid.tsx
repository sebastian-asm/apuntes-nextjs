'use client'
import { useRouter } from 'next/navigation'

import { Todo } from '@prisma/client'

import { TodoItem, todosApi } from '..'

interface Props {
  todos?: Todo[]
}

export default function TodosGrid({ todos = [] }: Props) {
  const router = useRouter()

  const toggleTodo = async (id: string, complete: boolean) => {
    await todosApi.toggleTodo(id, complete)
    // con este nuevo router no sería necesario un effect para actualizar la vista
    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos?.length > 0 && todos.map((todo) => <TodoItem key={todo.id} todo={todo} updateTodo={toggleTodo} />)}
    </div>
  )
}
