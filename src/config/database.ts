import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database conectada com sucesso!');
    return true;

  } catch (error) {
    console.log('❌Erro ao conectar Database');
    return false

  }
}

export default prisma;