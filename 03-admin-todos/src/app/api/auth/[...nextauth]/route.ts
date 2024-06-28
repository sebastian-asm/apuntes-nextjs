import { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { signInEmailPassword } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' }
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(credentials?.email!, credentials?.password!)
        if (user) return user
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },
  // los callback son funciones que pasan en cierto punto del ciclo de vida de la autenticación
  callbacks: {
    async signIn() {
      return true
    },
    async jwt({ token }) {
      // agregando información adicional del usuario al token
      const dbUser = await prisma.user.findUnique({ where: { email: token.email! } })
      token.roles = dbUser?.roles
      token.id = dbUser?.id as string
      return token
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.roles = token.roles
        session.user.id = token.id
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
