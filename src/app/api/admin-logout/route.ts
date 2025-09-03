import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/admin/login', req.url));
  // Clear the cookie with matching attributes
  res.cookies.set('admin', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return res;
}
