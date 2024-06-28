import { getServerSession } from 'next-auth'
import bcrypt from 'bcryptjs'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return await createUser(email, password)
  if (!bcrypt.compareSync(password, user.password!)) return null
  return user
}

const createUser = async (email: string, password: string) => {
  return await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0]
    }
  })
}

export const getUserSession = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}
