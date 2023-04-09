import * as z from 'zod';

export const mortgageSchema = z.object({
  firstLineOfAddress: z.string().min(1, { message: 'First line of address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  postcode: z.string().min(1, { message: 'Postcode is required' }),
  interestType: z.enum(['FIXED', 'VARIABLE']),
  purchaseType: z.enum(['HOMEOWNER', 'BUY_TO_LET', 'COMMERCIAL']),
  purchaseDate: z.date(),
  renewalDate: z.date(),
  initialMortgageAmount: z.number({ invalid_type_error: 'Initial mortgage amount is required' }).positive('Positive number is required')
});