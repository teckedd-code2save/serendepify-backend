import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      title: 'Software Engineer',
      password: 'password123',
      type: 'Employee',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      title: 'Marketing Specialist',
      password: 'password123',
      type: 'Employee',
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer.one@example.com',
      name: 'Jeph Bezos',
      password: 'password123',
      type: 'Customer',
    },
  });

  // Create Careers
  await prisma.career.createMany({
    data: [
      {
        title: 'Software Developer',
        company: 'Algorizz Inc',
        description: 'Developed cutting-edge software solutions.',
        location: 'Accra,Ghana',
        startDate: new Date('2020-01-01'),
        endDate: new Date('2022-12-31'),
        userId: user1.id,
      },
      {
        title: 'Marketing Lead',
        company: 'Algorizz Inc',
        description: 'Led marketing strategies for global campaigns.',
        location: 'Accra,Ghana',
        startDate: new Date('2018-06-01'),
        endDate: null, // Currently active
        userId: user2.id,
      },
    ],
  });

  // Create Chats
  await prisma.chat.createMany({
    data: [
      {
        message: 'Hi, how can I help you?',
        senderId: user1.id,
        receiverId: customer.id,
        createdAt: new Date(),
      },
      {
        message: 'I need help with my company website.',
        senderId: customer.id,
        receiverId: user1.id,
        createdAt: new Date(),
      },
    ],
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      {
        title: 'AI Learning Platform',
        description: 'A platform for learning AI concepts and tools.',
        url: 'https://ai-platform.example.com',
        domain: ['Tech', 'Education', 'AI'],
      },
      {
        title: 'Ecommerce Shop',
        description: 'An ecommerce platform for small businesses.',
        url: 'https://ecommerce.example.com',
        domain: ['Ecommerce', 'Finance'],
      },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
