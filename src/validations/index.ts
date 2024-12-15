import * as yup from 'yup';
import {validationMessages} from '@constant';

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PHONE_NUMBER_REGEX = /^\+[1-9]\d{1,14}$/;

export const ILoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationMessages.email.invalid)
    .required(validationMessages.email.required),
  // password: yup.string().required(validationMessages.password.required).matches(
  //     PASSWORD_REGEX,
  //     validationMessages.password.strong
  // ),
  isKeepLoggedIn: yup.boolean().required(),
});

export const IForgetPasswordFormSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationMessages.email.invalid)
    .required(validationMessages.email.required),
});

export const IAddUserFormSchema = yup.object().shape({
  firstName: yup.string().required(validationMessages.required),
  lastName: yup.string().required(validationMessages.required),
  email: yup
    .string()
    .email(validationMessages.email.invalid)
    .required(validationMessages.email.required),
  phone: yup
    .string()
    .required(validationMessages.required)
    .matches(PHONE_NUMBER_REGEX, 'Phone number is not valid')
    .max(17, 'Phone number must be at most 15 digits long'),
  role: yup.string().required(validationMessages.required),
});

export const IAddMessageFormSchema = yup.object({
  // date: yup.mixed().required(),
  date: yup.date().required('Date is required'),
  message: yup.string().required(),
  audience: yup
    .object()
    .shape({
      sitter: yup.boolean().required(),
      parent: yup.boolean().required(),
      allUsers: yup.boolean().required(),
    })
    .test('atLeastOneTrue', 'You must select at least one audience', obj =>
      Object.values(obj).some(Boolean),
    ),
  medium: yup
    .object()
    .shape({
      text: yup.boolean().required(),
      inApp: yup.boolean().required(),
      email: yup.boolean().required(),
    })
    .test('atLeastOneTrue', 'You must select at least one medium', obj =>
      Object.values(obj).some(Boolean),
    ),
});

export const IChangePasswordFormSchema = yup.object({
  password: yup.string().required(),
  newPassword: yup
    .string()
    .required(validationMessages.password.required)
    .matches(PASSWORD_REGEX, validationMessages.password.strong),
  confirmPassword: yup
    .string()
    .required(validationMessages.confirmPassword.required)
    .oneOf(
      [yup.ref('newPassword')],
      validationMessages.confirmPassword.notMatch,
    ),
});
