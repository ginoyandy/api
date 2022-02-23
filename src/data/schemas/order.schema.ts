import {
  object, string, number, array,
} from 'yup';

export const OrderSchema = object({
  body: object({
    orderedDate: string().required(),
    number: string().required(),
    owners: array(
      object({
        firstName: string().required(),
        lastName: string().required(),
        dni: string().required(),
      }),
    ),
    adress: string().required(),
    city: string().required(),
    department: string().required(),
    state: string().required(),
    enrollmentNumber: number().required(),
    folioNumber: number().required(),
    volumeNumer: number().required(),
    yearNumber: number().required(),
    observations: string().required(),
    orderAmmount: number().required(),
    informedDate: string().required(),
    totalArea: number().required(),
    office: string().required(),
  }),
});
