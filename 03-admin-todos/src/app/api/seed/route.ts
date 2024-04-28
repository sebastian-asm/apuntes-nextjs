import prisma from '@/lib/prisma'

export async function GET() {
  await prisma.todo.deleteMany()
  await prisma.todo.createMany({
    data: [
      {
        description: 'Tarea 1',
        complete: true
      },
      {
        description: 'Tarea 2'
      },
      {
        description: 'Tarea 3'
      },
      {
        description: 'Tarea 4'
      },
      {
        description: 'Tarea 5'
      }
    ]
  })

  return Response.json({ msg: 'Seed executed' })
}
