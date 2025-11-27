import { prisma } from '../db/prisma';

export async function getOrCreateActiveCartForUser(userId:number) {
  let cart = await prisma.cart.findFirst({ where: { userId, sent: false }, include: { items: { include: { product: true } } }});
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId }, include: { items: { include: { product: true } } }});
  }
  return cart;
}

export async function addItemToCart(userId:number, productId:number, quantity = 1) {
  const cart = await getOrCreateActiveCartForUser(userId);
  const product = await prisma.product.findUnique({ where: { id: productId }});
  if (!product) throw new Error('Product not found');
  const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId }});
  if (existing) {
    return prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + quantity }});
  }
  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
      priceCents: product.priceCents
    },
    include: { product: true }
  });
}

export async function sendCart(cartId:number, userId:number) {
  const cart = await prisma.cart.findUnique({ where: { id: cartId }});
  if (!cart || cart.userId !== userId) throw new Error('Not found or not owner');
  if (cart.sent) throw new Error('Already sent');
  return prisma.cart.update({ where: { id: cartId }, data: { sent: true, sentAt: new Date() }, include: { items: { include: { product: true } } }});
}