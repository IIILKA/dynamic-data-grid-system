import { z } from 'zod';

const signupFormSchema = z
  .object({
    username: z
      .string()
      .min(1, 'You must provide a username')
      .min(3, 'Username must be at least 3 characters long')
      .max(32, 'Username cannot exceed 32 characters'),
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
      .regex(/[^a-zA-Z0-9]/, 'Password must include at least one special character'),
    confirmPassword: z.string().min(1, 'You must confirm the password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Your password and confirmation password must match'
  });

export type SignupFormSchema = z.infer<typeof signupFormSchema>;

export { signupFormSchema };
