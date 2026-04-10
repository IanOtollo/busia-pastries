import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma/client'
import { redis } from '@/lib/redis/client'
import { loginSchema } from '@/lib/utils/validators'

const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 15 * 60 // 15 minutes

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data
        const lockKey = `login:lockout:${email}`

        // Check lockout
        const attempts = await redis.get<number>(lockKey)
        if (attempts && attempts >= MAX_ATTEMPTS) {
          throw new Error('ACCOUNT_LOCKED')
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user || !user.passwordHash) {
          await redis.incr(lockKey)
          await redis.expire(lockKey, LOCKOUT_SECONDS)
          return null
        }

        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) {
          await redis.incr(lockKey)
          await redis.expire(lockKey, LOCKOUT_SECONDS)
          return null
        }

        // Reset lockout on success
        await redis.del(lockKey)

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.role = (user as { role?: string }).role ?? 'CUSTOMER'
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string
        session.user.role = (token.role as string) ?? 'CUSTOMER'
      }
      return session
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
}
