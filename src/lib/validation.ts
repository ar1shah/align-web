import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  property_type: z.string().optional(),
  budget_min: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (typeof v === 'string' ? v.trim() : v)),
  budget_max: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (typeof v === 'string' ? v.trim() : v)),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export function coerceBudget(value: string | number | null | undefined) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const s = String(value).trim();
  if (s === '') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

