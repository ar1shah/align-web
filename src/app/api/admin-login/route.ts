import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    const adminPass = process.env.ADMIN_PASS;
    if (!adminPass) {
      // If this triggers, your env var isn't loaded (local or Vercel)
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    // normalize input just in case
    const input = (password ?? '').toString().trim();
    const expected = adminPass.toString().trim();

    if (input !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set('admin', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 6, // 6 hours
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
