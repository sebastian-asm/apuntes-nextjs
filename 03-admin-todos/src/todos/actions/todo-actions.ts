// el 'use server' en este nivel indica que todas las funciones que se escriban
// se ejecutarán del lado del servidor pero el cliente lo puede llamar
'use server'
import { revalidatePath } from 'next/cache'

import { Todo } from '@prisma/client'
import prisma from '@/lib/prisma'

// simulación de conexión lenta
export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), seconds * 1000)
  })
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  // await sleep(3)
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) throw `El id ${id} no existe`
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete }
  })
  // esto actualizará el front solo lo que cambio
  revalidatePath('/dashboard/server-todos')
  return updatedTodo
}

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } })
    revalidatePath('/dashboard/server-todos')
    return todo
  } catch (error) {
    return Response.json({ error }, { status: 400 })
  }
}

export const deleteAllTodos = async () => {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } })
    revalidatePath('/dashboard/server-todos')
    return true
  } catch (error) {
    return false
  }
}
