import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`);
    const response = await res.json();
    // console.log('response ', response);
    return NextResponse.json({
      state: true,
      message: response,
    });
  } catch (error) {
    return NextResponse.json({
      state: false,
      message: error,
    });
  }
}
