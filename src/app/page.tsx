export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Align</h1>
      <p className="mt-2 text-gray-700">
        Match with the right realtor — fast, simple, and free.
      </p>
      <a
        href="/quiz"
        className="inline-block mt-6 rounded bg-black text-white px-4 py-2"
      >
        Find My Realtor
      </a>
    </main>
  );
}
