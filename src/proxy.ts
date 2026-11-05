import { NextResponse } from 'next/server';

export function proxy() {
  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'max-age=300');
  res.headers.set('CDN-Cache-Control', 'max-age=86400');
  return res;
}

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
