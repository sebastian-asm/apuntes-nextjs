// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos'

export const metadata = {
  title: 'Listado de tareas'
}

export default async function ServerTododPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'desc' } })
  return (
    <div className="px-6 pt-6">
      <NewTodo />
      <h1 className="text-2xl mb-4">Server Actions</h1>
      <TodosGrid todos={todos} />
    </div>
  )
}
