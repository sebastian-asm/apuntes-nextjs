'use client'
import { Todo } from '@prisma/client'

import { TodoItem } from '..'
import { toggleTodo } from '../actions/todo-actions'

interface Props {
  todos?: Todo[]
}

export default function TodosGrid({ todos = [] }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos?.length > 0 && todos.map((todo) => <TodoItem key={todo.id} todo={todo} updateTodo={toggleTodo} />)}
    </div>
  )
}
