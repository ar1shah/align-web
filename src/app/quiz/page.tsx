'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { leadFormSchema, type LeadFormData } from '@/lib/validation';

// Schema provided by lib/validation

export default function QuizPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadFormSchema),
  });

  const onSubmit = async (values: LeadFormData) => {
    setSubmitError(null);
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      reset();
      router.push('/thanks');
    } else {
      const { error } = await res.json();
      setSubmitError(error || 'Something went wrong');
    }
  };

  return (
    <main className="container section max-w-2xl space-y-4">
      <h1 className="text-3xl font-semibold">Find My Realtor</h1>
      <p className="muted">Answer a few quick questions and we’ll match you with top agents.</p>
      {submitError && (
        <p className="text-red-400 text-sm" role="alert">{submitError}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="card card-padding space-y-3">
        <div>
          <input
            className="input"
            placeholder="Full name"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            className="input"
            placeholder="Email"
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <input
          className="input"
          placeholder="Phone"
          {...register('phone')}
        />

        <div className="grid grid-cols-2 gap-3">
          <input className="input" placeholder="City" {...register('city')} />
          <input className="input" placeholder="State" {...register('state')} />
        </div>

        <input
          className="input"
          placeholder="Property type (e.g., condo)"
          {...register('property_type')}
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              className="input"
              placeholder="Budget min"
              {...register('budget_min')}
            />
            {errors.budget_min && (
              <p className="text-red-400 text-sm">
                {errors.budget_min.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="input"
              placeholder="Budget max"
              {...register('budget_max')}
            />
            {errors.budget_max && (
              <p className="text-red-400 text-sm">
                {errors.budget_max.message}
              </p>
            )}
          </div>
        </div>

        <button className="w-full btn btn-primary justify-center">Submit</button>
      </form>
    </main>
  );
}
