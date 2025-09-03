import Link from 'next/link';

export default function ThanksPage() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-4 text-center">
      <h1 className="text-3xl font-semibold">Thank you!</h1>
      <p className="text-gray-700">
        We received your details and will match you with the best realtors shortly.
      </p>
      <div className="space-x-3 mt-4">
        <Link href="/" className="inline-block rounded bg-black text-white px-4 py-2">Home</Link>
        <Link href="/quiz" className="inline-block rounded border px-4 py-2">Submit another</Link>
      </div>
    </main>
  );
}
