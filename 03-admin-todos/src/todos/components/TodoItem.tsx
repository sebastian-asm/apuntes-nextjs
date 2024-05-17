'use client'
import { startTransition, useOptimistic } from 'react'

import { Todo } from '@prisma/client'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'

import style from './TodoItem.module.css'

interface Props {
  todo: Todo
  updateTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export default function TodoItem({ todo, updateTodo }: Props) {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(todo, (state, newCompleteValue: boolean) => ({
    ...state,
    complete: newCompleteValue
  }))

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
      await updateTodo(todoOptimistic.id, !todoOptimistic.complete)
    } catch {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
    }
  }

  return (
    <div className={todoOptimistic.complete ? style.todoDone : style.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div onClick={onToggleTodo} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-opacity-60">
          {todoOptimistic.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
          <p className="ml-2.5">{todoOptimistic.description}</p>
        </div>
      </div>
    </div>
  )
}
