import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a meditation habit
  const meditation = await prisma.habit.create({
    data: {
      title: 'meditation',
      entries: {
        create: [
          {
            date: new Date(),
            count: 1
          }
        ]
      }
    }
  })

  console.log({ meditation })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
