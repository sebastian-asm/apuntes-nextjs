import * as yup from 'yup'

import { getUserSession } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10')
  const skip = Number(searchParams.get('skip') ?? '0')
  const todos = await prisma.todo.findMany({ take, skip })
  return Response.json({ todos })
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {
  try {
    const user = await getUserSession()
    if (!user) throw new Error('No autorizado')
    const { complete, description } = await postSchema.validate(await request.json())
    const todo = await prisma.todo.create({ data: { complete, description, userId: user.id } })
    return Response.json({ todo }, { status: 201 })
  } catch (error) {
    return Response.json({ error }, { status: 400 })
  }
}

export async function DELETE() {
  try {
    const user = await getUserSession()
    if (!user) throw new Error('No autorizado')
    await prisma.todo.deleteMany({ where: { complete: true, userId: user.id } })
    return Response.json({})
  } catch (error) {
    return Response.json({ error }, { status: 400 })
  }
}
