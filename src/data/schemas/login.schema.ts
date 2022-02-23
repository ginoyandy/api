import { object, string } from 'yup';

export const loginSchema = object({
  body: object({
    username: string().required('Username is required. '),
    password: string().required('Pasword is required. '),
  }),
});
