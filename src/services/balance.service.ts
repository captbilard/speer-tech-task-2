import { Prisma } from '@prisma/client';
import prisma from '../../prisma/db';

export const addBalance = async (amount, userId) => {
  try {
    const wallet = await prisma.wallet.findUnique({
      where: {
        userId
      }
    });
    const newBalance = wallet.balance + amount;
    const updatedWallet = await prisma.wallet.update({
      where: {
        userId
      },
      data: {
        balance: newBalance
      }
    });
    return { updatedWallet };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        error.message = 'record not found';
      }
    }
    throw error;
  }
};
