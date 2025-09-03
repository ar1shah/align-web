import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendAdminNewLead, sendClientReceipt } from '@/lib/email';
import { leadFormSchema, coerceBudget, type LeadFormData } from '@/lib/validation';

// Simple in-memory rate limit per IP (5 requests / 60s)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const h = req.headers;
  const xff = h.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return h.get('x-real-ip') ?? h.get('cf-connecting-ip') ?? 'local';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const arr = ipHits.get(ip) ?? [];
  const recent = arr.filter((t) => t > windowStart);
  recent.push(now);
  ipHits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export async function POST(req: Request) {
  try {
    // Rate limit
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const json = (await req.json()) as unknown;
    const parsed = leadFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 422 }
      );
    }
    const body = parsed.data as LeadFormData;

    const insertRow = {
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      city: body.city ?? null,
      state: body.state ?? null,
      property_type: body.property_type ?? null,
      budget_min: coerceBudget(body.budget_min),
      budget_max: coerceBudget(body.budget_max),
    };

    const { error } = await supabaseAdmin.from('leads').insert(insertRow);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Best-effort audit log (table must exist: lead_audit)
    const userAgent = req.headers.get('user-agent') ?? null;
    try {
      await supabaseAdmin.from('lead_audit').insert({
        ip,
        user_agent: userAgent,
        created_at: new Date().toISOString(),
        email: insertRow.email,
        name: insertRow.name,
      });
    } catch {
      // ignore if table not present
    }

    const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';
    await Promise.allSettled([
      sendClientReceipt(insertRow, siteUrl),
      sendAdminNewLead(insertRow, siteUrl),
    ]);

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
