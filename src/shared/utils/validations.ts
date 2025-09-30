import { z } from 'zod';
import { validationMessages } from '@constant';

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PHONE_NUMBER_REGEX = /^\+[1-9]\d{1,14}$/;

export const ILoginFormSchema = z.object({
  email: z
    .email({ message: validationMessages.email.invalid })
    .min(1, validationMessages.email.required),
  password: z.string().min(1, validationMessages.password.required),
  isKeepLoggedIn: z.boolean().optional(),
});

export const IForgetPasswordFormSchema = z.object({
  email: z
    .email({ message: validationMessages.email.invalid })
    .min(1, validationMessages.email.required),
});

export const IAddUserFormSchema = z.object({
  firstName: z.string().min(1, validationMessages.required),
  lastName: z.string().min(1, validationMessages.required),
  email: z
    .email({ message: validationMessages.email.invalid })
    .min(1, validationMessages.email.required),
  phone: z
    .string()
    .min(1, validationMessages.required)
    .regex(PHONE_NUMBER_REGEX, 'Phone number is not valid')
    .max(17, 'Phone number must be at most 15 digits long'),
  role: z.string().min(1, validationMessages.required),
  password: z
    .string()
    .min(1, validationMessages.password.required)
    .regex(PASSWORD_REGEX, validationMessages.password.strong),
});

export const IChangePasswordFormSchema = z
  .object({
    password: z.string().min(1),
    newPassword: z
      .string()
      .min(1, validationMessages.password.required)
      .regex(PASSWORD_REGEX, validationMessages.password.strong),
    confirmPassword: z
      .string()
      .min(1, validationMessages.confirmPassword.required),
  })
  .superRefine(
    (
      data: { password: string; newPassword: string; confirmPassword: string },
      ctx: z.RefinementCtx,
    ) => {
      if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: validationMessages.confirmPassword.notMatch,
          path: ['confirmPassword'],
        });
      }
    },
  );
