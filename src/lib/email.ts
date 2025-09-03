import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

export type Lead = {
  name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  property_type?: string | null;
  budget_min?: string | number | null;
  budget_max?: string | number | null;
};

const from = process.env.EMAIL_FROM ?? 'Align <noreply@example.com>';
const admin = process.env.ADMIN_EMAIL ?? '';

export async function sendClientReceipt(lead: Lead, siteUrl: string) {
  if (!resend) {
    console.warn('Resend not configured; skipping client email');
    return;
  }
  await resend.emails.send({
    from,
    to: lead.email,
    subject: 'We received your request — Align',
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Thanks, ${lead.name}!</h2>
        <p>We received your request and will match you with the best realtors shortly.</p>
        <p>You can reply to this email if you have updates.</p>
        <p>— The Align Team</p>
        <hr/>
        <small><a href="${siteUrl}">${siteUrl}</a></small>
      </div>
    `,
  });
}

export async function sendAdminNewLead(lead: Lead, siteUrl: string) {
  if (!resend) {
    console.warn('Resend not configured; skipping admin email');
    return;
  }
  if (!admin) {
    console.warn('ADMIN_EMAIL not set; skipping admin email');
    return;
  }
  const fmt = (v?: string | number | null) => (v === null || v === undefined || v === '' ? '-' : String(v));
  await resend.emails.send({
    from,
    to: admin,
    subject: `New Lead: ${lead.name} (${lead.city ?? ''} ${lead.state ?? ''})`,
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>New Lead</h2>
        <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse">
          <tr><td><b>Name</b></td><td>${lead.name}</td></tr>
          <tr><td><b>Email</b></td><td>${lead.email}</td></tr>
          <tr><td><b>Phone</b></td><td>${fmt(lead.phone)}</td></tr>
          <tr><td><b>City</b></td><td>${fmt(lead.city)}</td></tr>
          <tr><td><b>State</b></td><td>${fmt(lead.state)}</td></tr>
          <tr><td><b>Type</b></td><td>${fmt(lead.property_type)}</td></tr>
          <tr><td><b>Budget</b></td><td>${fmt(lead.budget_min)} — ${fmt(lead.budget_max)}</td></tr>
        </table>
        <p style="margin-top:16px">
          <a href="${siteUrl}/admin">Open Admin</a>
        </p>
      </div>
    `,
  });
}
