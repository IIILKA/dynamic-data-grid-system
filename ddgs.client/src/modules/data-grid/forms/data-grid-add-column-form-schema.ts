import { z } from 'zod';

const dataGridAddColumnFormSchema = z.object({
  name: z
    .string()
    .min(1, 'You must provide a column name')
    .max(32, 'Column name cannot exceed 32 characters'),
  type: z.string().min(1, 'You must provide a column type')
});

export type DataGridAddColumnFormSchema = z.infer<typeof dataGridAddColumnFormSchema>;

export { dataGridAddColumnFormSchema };
