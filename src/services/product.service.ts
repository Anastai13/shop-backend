import { prisma } from '../db/prisma';

export async function listProducts() {
  return prisma.product.findMany({ orderBy: { id: 'asc' } });
}

export async function createProduct(data: { title: string; description?: string; priceCents: number }) {
  return prisma.product.create({ data });
}

export async function updateProduct(
  id: number,
  data: { title?: string; description?: string; priceCents?: number }
) {
  return prisma.product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({ where: { id } });
  return { message: 'Product deleted' };
}

