import { redirect } from 'next/navigation'

import { getUserSession } from '@/auth/actions/auth-actions'
import { NewTodo, TodosGrid } from '@/todos'
import prisma from '@/lib/prisma'

export const metadata = {
  title: 'Listado de tareas'
}

export default async function RestTododPage() {
  const user = await getUserSession()
  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'desc' }
  })

  return (
    <div className="p-6">
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  )
}
