import prisma from '@/lib/prisma'

import { NewTodo, TodosGrid } from '@/todos'

export const metadata = {
  title: 'Listado de tareas'
}

export default async function RestTododPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'desc' } })
  return (
    <div className="p-6">
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  )
}
