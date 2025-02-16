'use server';

import { getBaseUrl } from '@/utils/serverHelpers';
import { Token, TokenFormData } from '../type';
import { revalidateTag } from 'next/cache';

const getActiveToken = async (): Promise<Token> => {
  const baseUrl = await getBaseUrl();
  const activeToken = await fetch(`${baseUrl}/api/token/active`, {
    next: { tags: ['token'] },
  });
  const tokenres = await activeToken.json();
  return tokenres;
};
const addToken = async (
  data: TokenFormData,
): Promise<{ state: boolean; message: string; data: Token | null }> => {
  try {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`${baseUrl.toString()}/api/token`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const tokenres = await response.json();
    revalidateTag('token');
    return {
      state: true,
      message: 'Token added successfully',
      data: tokenres,
    };
  } catch (error) {
    console.error('Error adding token:', error);
    return {
      state: false,
      message: 'Failed to add token',
      data: null,
    };
  }
};

const makeActive = async (id: string) => {
  try {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`${baseUrl.toString()}/api/token/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'ACTIVE' }),
    });
    const tokenres = await response.json();
    revalidateTag('token');
    return {
      state: true,
      message: 'Token made active successfully',
      data: tokenres,
    };
  } catch (error) {
    console.error('Error making token active:', error);
    return {
      state: false,
      message: 'Failed to make token active',
      data: null,
    };
  }
};

const deleteToken = async (id: string) => {
  try {
    const baseUrl = await getBaseUrl();
    const response = await fetch(`${baseUrl.toString()}/api/token/${id}`, {
      method: 'DELETE',
    });
    const tokenres = await response.json();
    revalidateTag('token');
    return {
      state: true,
      message: 'Token deleted successfully',
      data: tokenres,
    };
  } catch (error) {
    console.error('Error deleting token:', error);
    return {
      state: false,
      message: 'Failed to delete token',
      data: null,
    };
  }
};
export { getActiveToken, addToken, deleteToken, makeActive };
