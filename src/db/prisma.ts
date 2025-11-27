import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
export const prisma = new PrismaClient();

export async function connectDB() {
  await prisma.$connect();
}

export async function disconnectDB() {
  await prisma.$disconnect();
}