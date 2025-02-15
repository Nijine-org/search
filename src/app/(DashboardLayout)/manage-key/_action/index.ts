'use server';

import prisma from '../../../../../lib/prisma';
import { Key } from '../type';

const getActiveToken = async (): Promise<Key> => {
  const activeToken = await prisma.token.findFirst({
    where: { status: 'ACTIVE' },
  });
  return activeToken;
};

export { getActiveToken };
