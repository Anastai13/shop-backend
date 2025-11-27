import { prisma } from '../db/prisma';

export async function listProducts() {
  return prisma.product.findMany({ orderBy: { id: 'asc' }});
}

export async function createProduct(data:{title:string, description?:string, priceCents:number}) {
  return prisma.product.create({ data });
}