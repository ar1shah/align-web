'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send password to API for verification
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Wrong password');
    }
  };

  return (
    <main className="container section max-w-sm">
      <div className="card card-padding">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Enter password"
          />
          <button className="w-full btn btn-primary justify-center">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
