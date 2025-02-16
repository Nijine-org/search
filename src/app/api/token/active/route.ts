import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET() {
  try {
    // Fetch the ACTIVE token
    const activeToken = await prisma.token.findFirst({
      where: { status: 'ACTIVE' },
    });

    if (!activeToken) {
      return NextResponse.json(
        { error: 'No active token found' },
        { status: 404 },
      );
    }

    return NextResponse.json(activeToken, { status: 200 });
  } catch (error) {
    console.error('Error fetching active token:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active token' },
      { status: 500 },
    );
  }
}
