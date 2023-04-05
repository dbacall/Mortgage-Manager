import * as z from 'zod';

export const companySchema = z.object({
  name: z.string().min(1, { message: 'Company name is required' }),
  clientsFile: z.any().refine((file: File[]) => {
    return file.length > 0 && file[0] && file[0].type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  }, "Please upload file in .xlsx format")
});