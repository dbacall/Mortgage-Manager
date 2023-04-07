import * as z from 'zod';

export const mortgageSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email(),
  phone: z.string().min(1, { message: 'Phone number is required' }),
});