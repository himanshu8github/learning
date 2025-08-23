import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// async function createUser(){
//   prisma.users.create({
//   data:{
//     username: "himani",
//     email : "himani@gmail.com",
//     password: "124578",
//     age : 22,
//   }
// })
// }
// createUser();
async function main() {
    const user = await prisma.users.create({
        data: {
            username: "john_doe",
            email: "john@example.com",
            password: "hashedpassword",
            age: 25
        }
    });
    console.log("Inserted:", user);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map