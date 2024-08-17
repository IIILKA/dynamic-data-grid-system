import { z } from 'zod';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'You must enter an email address')
    .email('The email you entered is not in the correct format'),
  password: z
    .string()
    .min(1, 'You must provide a password')
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[0-9]/, 'Password must include at least one number')
    .regex(/[a-z]/, 'Password must include at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .regex(/[^a-zA-Z0-9]/, 'Password must include at least one special character')
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export { loginFormSchema, LoginFormSchema };
