'use client'
import { Todo } from '@prisma/client'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'

import style from './TodoItem.module.css'

interface Props {
  todo: Todo
  updateTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export default function TodoItem({ todo, updateTodo }: Props) {
  return (
    <div className={todo.complete ? style.todoDone : style.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => updateTodo(todo.id, !todo.complete)}
          className="flex items-center p-2 rounded-md cursor-pointer hover:bg-opacity-60"
        >
          {todo.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
          <p className="ml-2.5">{todo.description}</p>
        </div>
      </div>
    </div>
  )
}
