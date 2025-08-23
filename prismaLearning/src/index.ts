import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
  const user = await prisma.users.create({
    data: {
      username: "himani",
      email: "himani@gmail.com",
      password: "124578",
      age: 22,
    },
  });
  console.log("Created user:", user);
}

async function findUser(){
    const user1 = await prisma.users.findFirst({
        where : {
            id : 5
        }

    })

    console.log(user1)
}



findUser()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
