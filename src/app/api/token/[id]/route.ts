import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
// Update token status
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Token ID and new status are required' },
        { status: 400 },
      );
    }

    // Check if the token exists
    const existingToken = await prisma.token.findUnique({
      where: { id },
    });

    if (!existingToken) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    // Ensure only one ACTIVE token exists at a time
    if (status === 'ACTIVE') {
      await prisma.token.updateMany({
        where: { status: 'ACTIVE' },
        data: { status: 'AVAILABLE' },
      });
    }

    // Update the token status
    const updatedToken = await prisma.token.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedToken, { status: 200 });
  } catch (error) {
    console.error('Error updating token status:', error);
    return NextResponse.json(
      { error: 'Failed to update token status' },
      { status: 500 },
    );
  }
}

// Delete token
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Find the token to be deleted
    const tokenToDelete = await prisma.token.findUnique({
      where: { id },
    });

    if (!tokenToDelete) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    // Delete the token
    await prisma.token.delete({ where: { id } });

    // If the deleted token was ACTIVE, find the next AVAILABLE token
    if (tokenToDelete.status === 'ACTIVE') {
      const nextAvailableToken = await prisma.token.findFirst({
        where: { status: 'AVAILABLE' },
        orderBy: { createdAt: 'asc' }, // Prioritize the oldest available token
      });

      if (nextAvailableToken) {
        await prisma.token.update({
          where: { id: nextAvailableToken.id },
          data: { status: 'ACTIVE' },
        });
      }
    }

    return NextResponse.json(
      { message: 'Token deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting token:', error);
    return NextResponse.json(
      { error: 'Failed to delete token' },
      { status: 500 },
    );
  }
}
