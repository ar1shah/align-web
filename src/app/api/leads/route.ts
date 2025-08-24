import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { error } = await supabaseAdmin.from('leads').insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      city: body.city,
      state: body.state,
      property_type: body.property_type,
      budget_min: body.budget_min,
      budget_max: body.budget_max,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
