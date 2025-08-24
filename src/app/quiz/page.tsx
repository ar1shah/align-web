'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. Define schema
const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  property_type: z.string().optional(),
  budget_min: z
    .string()
    .regex(/^\d*$/, 'Must be a number')
    .optional(),
  budget_max: z
    .string()
    .regex(/^\d*$/, 'Must be a number')
    .optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function QuizPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: FormData) => {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      alert('Thanks! We’ll match you with realtors shortly.');
      reset();
    } else {
      const { error } = await res.json();
      alert(error || 'Something went wrong');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Find My Realtor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            className="w-full border p-2 rounded"
            placeholder="Full name"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <input
          className="w-full border p-2 rounded"
          placeholder="Phone"
          {...register('phone')}
        />

        <div className="grid grid-cols-2 gap-3">
          <input className="border p-2 rounded" placeholder="City" {...register('city')} />
          <input className="border p-2 rounded" placeholder="State" {...register('state')} />
        </div>

        <input
          className="w-full border p-2 rounded"
          placeholder="Property type (e.g., condo)"
          {...register('property_type')}
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              className="border p-2 rounded"
              placeholder="Budget min"
              {...register('budget_min')}
            />
            {errors.budget_min && (
              <p className="text-red-600 text-sm">
                {errors.budget_min.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="border p-2 rounded"
              placeholder="Budget max"
              {...register('budget_max')}
            />
            {errors.budget_max && (
              <p className="text-red-600 text-sm">
                {errors.budget_max.message}
              </p>
            )}
          </div>
        </div>

        <button className="w-full bg-black text-white p-2 rounded">Submit</button>
      </form>
    </main>
  );
}
