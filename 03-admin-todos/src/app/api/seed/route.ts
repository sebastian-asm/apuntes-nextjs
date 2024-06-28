import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()
  await prisma.user.create({
    data: {
      email: 'demo@demo.com',
      password: bcrypt.hashSync('12345'),
      roles: ['user', 'client'],
      todos: {
        create: [
          { description: 'Tarea 1', complete: true },
          { description: 'Tarea 2' },
          { description: 'Tarea 3' },
          { description: 'Tarea 4' },
          { description: 'Tarea 5' }
        ]
      }
    }
  })

  return Response.json({ msg: 'Seed executed' })
}
