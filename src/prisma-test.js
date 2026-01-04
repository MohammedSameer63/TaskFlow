const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@prisma.com",
      password: "hashed-password",
    },
  });

  console.log(user);

  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
