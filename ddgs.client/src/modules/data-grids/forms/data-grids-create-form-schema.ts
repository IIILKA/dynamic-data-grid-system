import { z } from 'zod';

const dataGridsCreateFormSchema = z.object({
  name: z
    .string()
    .min(1, 'You must provide a data grid name')
    .min(3, 'Data grid name must be at least 3 characters long')
    .max(64, 'Data grid name cannot exceed 64 characters')
});

export type DataGridsCreateFormSchema = z.infer<typeof dataGridsCreateFormSchema>;

export { dataGridsCreateFormSchema };
