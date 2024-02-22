import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// push data to database
async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password1',
      status: 1,
      role: 'EMPLOYEE',
      tasks: {
        create: [
          {
            title: 'Task 1 for User 1',
            isDone: true,
            content: "Hello world"
          },
          {
            title: 'Task 2 for User 1',
            isDone: false,
            content: "Hello world"

          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password2',
      status: 1,
      role: 'ADMIN',
      tasks: {
        create: [
          {
            title: 'Task 1 for User 2',
            isDone: true,
            content: "Hello world"

          },
        ],
      },
    },
  });

  console.log('Users and tasks created:', user1, user2);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
