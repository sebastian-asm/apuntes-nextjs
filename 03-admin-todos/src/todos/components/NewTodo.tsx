'use client'
import { FormEvent, useState } from 'react'

import { IoTrashOutline } from 'react-icons/io5'

import { addTodo, deleteAllTodos } from '../actions/todo-actions'

export default function NewTodo() {
  const [description, setDescription] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (description.trim().length === 0) return
    await addTodo(description)
    setDescription('')
  }

  return (
    <div className="w-full mb-6">
      <form onSubmit={onSubmit} className="flex">
        <input
          onChange={({ target }) => setDescription(target.value)}
          value={description}
          type="text"
          className="pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
          placeholder="Nueva tarea..."
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-lg ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
        >
          Crear
        </button>

        <span className="flex flex-1"></span>

        <button
          onClick={() => deleteAllTodos()}
          type="button"
          className="flex items-center justify-center rounded-lg ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
        >
          <IoTrashOutline className="mr-1.5" />
          Borrar completados
        </button>
      </form>
    </div>
  )
}
