import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic'; // ensures fresh data each load

export default async function AdminPage() {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <pre>{error.message}</pre>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Leads</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-200 text-gray-800 font-semibold">
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">State</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Budget</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr key={row.id} className="bg-white text-gray-800">
                <td className="p-2 border">
                  {new Date(row.created_at).toLocaleString()}
                </td>
                <td className="p-2 border">{row.name}</td>
                <td className="p-2 border">{row.email}</td>
                <td className="p-2 border">{row.city}</td>
                <td className="p-2 border">{row.state}</td>
                <td className="p-2 border">{row.property_type}</td>
                <td className="p-2 border">
                  {row.budget_min ?? '-'} – {row.budget_max ?? '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
