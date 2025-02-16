import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
// Save a new token
export async function POST(req: Request) {
  try {
    const { token, name } = await req.json();
    if (!token || !name) {
      return NextResponse.json(
        { error: 'Token and name are required' },
        { status: 400 },
      );
    }

    // Check if there is an existing ACTIVE token
    const activeToken = await prisma.token.findFirst({
      where: { status: 'ACTIVE' },
    });

    // Determine status for the new token
    const newStatus = activeToken ? 'AVAILABLE' : 'ACTIVE';

    // Add the new token with the determined status
    const newToken = await prisma.token.create({
      data: { token, name, status: newStatus },
    });

    return NextResponse.json(newToken, { status: 201 });
  } catch (error) {
    console.error('Error adding token:', error);
    return NextResponse.json(
      { error: 'Failed to save token' },
      { status: 500 },
    );
  }
}

// Retrieve all tokens
export async function GET() {
  try {
    const tokens = await prisma.token.findMany();
    return NextResponse.json(tokens, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    // Delete all tokens
    await prisma.token.deleteMany();

    return NextResponse.json(
      { message: 'All tokens deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting all tokens:', error);
    return NextResponse.json(
      { error: 'Failed to delete tokens' },
      { status: 500 },
    );
  }
}
