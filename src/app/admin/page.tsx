import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Check admin cookie
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin')?.value === 'true' || !!cookieStore.get('admin');
  if (!isAdmin) {
    redirect('/admin/login');
  }

  // Fetch leads
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <pre>{error.message}</pre>;

  return (
    <main className="container section max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <form action="/api/admin-logout" method="post">
          <button className="btn btn-outline">Logout</button>
        </form>
      </div>

      <div className="overflow-x-auto card">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-3 border-b border-[var(--border)]">Created</th>
              <th className="p-3 border-b border-[var(--border)]">Name</th>
              <th className="p-3 border-b border-[var(--border)]">Email</th>
              <th className="p-3 border-b border-[var(--border)]">City</th>
              <th className="p-3 border-b border-[var(--border)]">State</th>
              <th className="p-3 border-b border-[var(--border)]">Type</th>
              <th className="p-3 border-b border-[var(--border)]">Budget</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr key={row.id} className="border-b border-[var(--border)]">
                <td className="p-3">{new Date(row.created_at).toLocaleString()}</td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3">{row.city}</td>
                <td className="p-3">{row.state}</td>
                <td className="p-3">{row.property_type}</td>
                <td className="p-3">{row.budget_min ?? '-'} - {row.budget_max ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
