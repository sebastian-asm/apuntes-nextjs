import { Todo } from '@prisma/client'

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const resp = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ complete }),
    headers: { 'Content-Type': 'application/json' }
  })
  const todo = await resp.json()
  return todo
}

export const createTodo = async (description: string): Promise<Todo> => {
  const resp = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ description }),
    headers: { 'Content-Type': 'application/json' }
  })
  const todo = await resp.json()
  return todo
}

export const deleteAll = async (): Promise<boolean> => {
  try {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    return true
  } catch {
    return false
  }
}
