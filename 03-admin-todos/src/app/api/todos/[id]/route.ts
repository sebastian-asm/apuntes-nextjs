import * as yup from 'yup'
import prisma from '@/lib/prisma'

interface Segments {
  params: { id: string }
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) return Response.json({ msg: `El id ${id} no existe` }, { status: 404 })
  return Response.json({ todo })
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional()
})

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) return Response.json({ msg: `El id ${id} no existe` }, { status: 404 })

  try {
    const { complete, description } = await putSchema.validate(await request.json())
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description }
    })
    return Response.json({ updatedTodo })
  } catch (error) {
    return Response.json({ error }, { status: 400 })
  }
}
