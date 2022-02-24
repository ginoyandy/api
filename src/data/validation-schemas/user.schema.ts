import { object, string, ref } from 'yup';

export const createUserSchema = object({
  body: object({
    username: string()
      .required('Username is required. ')
      .min(8, 'Username is too short: minimum of 8 characters. ')
      .matches(
        /^[a-z0-9_.-]*$/,
        'Username can only contains lower case letters and numbers. ',
      ),
    password: string()
      .required('Pasword is required. ')
      .min(8, 'Password is too short: minimum of 8 characters. '),
    passwordConfirm: string().oneOf(
      [ref('password'), null],
      'Password and confirmation should be equal. ',
    ),
    email: string()
      .email('Email must be a vaid email. ')
      .required('Email is required. '),
  }),
});
