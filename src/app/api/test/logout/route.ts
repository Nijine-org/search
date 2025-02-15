import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const incomingHeaders = headers();
  const incomingCookies = cookies();
  const outgoingHeaders = new Headers();
  for (const [key, value] of incomingHeaders.entries()) {
    if (!(key === 'content-length')) {
      outgoingHeaders.set(key, value);
    }
  }
  const cookieString = incomingCookies.toString();
  if (cookieString) {
    outgoingHeaders.set('Cookie', cookieString);
  }
  outgoingHeaders.set('Content-Type', 'application/json');
  outgoingHeaders.set('Accept', 'application/json');
  fetch(`https://auth.devcri.com/logout`, {
    headers: outgoingHeaders,
    credentials: 'include',
  })
    .then(() => {
      return NextResponse.json({
        state: true,
        message: 'Success',
      });
    })
    .catch((error) => {
      return NextResponse.json({
        state: false,
        message: error.message,
      });
    });
}
