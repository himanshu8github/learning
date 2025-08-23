import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function createUser() {
    prisma.users.create({
        data: {
            username: "himani",
            email: "himani@gmail.com",
            password: "124578",
            age: 22,
        }
    });
}
createUser();
//# sourceMappingURL=index.js.map