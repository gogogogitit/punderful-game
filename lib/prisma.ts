import { PrismaClient } from '.prisma/client'

declare global {
  var prisma: typeof PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
  log: ['query'],
})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
export { prisma }