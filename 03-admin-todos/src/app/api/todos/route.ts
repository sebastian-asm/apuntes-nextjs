import * as yup from 'yup'
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
    const { complete, description } = await postSchema.validate(await request.json())
    const todo = await prisma.todo.create({ data: { complete, description } })
    return Response.json({ todo }, { status: 201 })
  } catch (error) {
    return Response.json({ error }, { status: 400 })
  }
}

export async function DELETE() {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } })
    return Response.json({})
  } catch (error) {
    return Response.json({ error }, { status: 400 })
  }
}
