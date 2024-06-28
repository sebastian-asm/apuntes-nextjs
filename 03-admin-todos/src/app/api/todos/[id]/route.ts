import * as yup from 'yup'

import prisma from '@/lib/prisma'
import { getUserSession } from '@/auth/actions/auth-actions'

interface Segments {
  params: { id: string }
}

const getTodo = async (id: string) => {
  const user = await getUserSession()
  if (!user) return null
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (todo?.userId !== user.id) return null
  return todo
}

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id)
  if (!todo) return Response.json({ msg: `El id ${params.id} no existe` }, { status: 404 })
  return Response.json({ todo })
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional()
})

export async function PUT(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id)
  if (!todo) return Response.json({ msg: `El id ${params.id} no existe` }, { status: 404 })

  try {
    const { complete, description } = await putSchema.validate(await request.json())
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { complete, description }
    })
    return Response.json({ updatedTodo })
  } catch (error) {
    return Response.json({ error }, { status: 400 })
  }
}
