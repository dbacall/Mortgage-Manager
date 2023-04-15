import * as z from 'zod';

export const memberSchema = z.object({
  email: z.string().email('Must be an email.'),
});