// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-dynamic'
export const revalidate = 0
import { redirect } from 'next/navigation'

import { getUserSession } from '@/auth/actions/auth-actions'
import { NewTodo, TodosGrid } from '@/todos'
import prisma from '@/lib/prisma'

export const metadata = {
  title: 'Listado de tareas'
}

export default async function ServerTododPage() {
  const user = await getUserSession()
  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'desc' }
  })

  return (
    <div className="p-6">
      <NewTodo />
      <h1 className="text-2xl mb-4">Server Actions</h1>
      <TodosGrid todos={todos} />
    </div>
  )
}
