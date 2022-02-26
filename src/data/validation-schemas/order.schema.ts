import {
  object, string, number, array, date,
} from 'yup';

export const OrderValidationSchema = object({
  body: object({
    orderedDate: date().required(),
    orderNumber: string().required(),
    owners: array(
      object({
        firstName: string().required(),
        lastName: string(),
        dni: string().required(),
      }),
    ),
    adress: string().required(),
    streetNumber: string().required(),
    adressFloor: string().required(),
    apartmentNumber: string().required(),
    city: string().required(),
    department: string().required(),
    state: string().required(),
    enrollmentNumber: number().required(),
    folioNumber: number().required(),
    volumeNumber: number().required(),
    yearNumber: number().required(),
    observations: string().required(),
    orderAmmount: number().required(),
    informedDate: date().required(),
    totalArea: number().required(),
    office: string().required(),
    remittance: string().required(),
    providerFactory: string().required(),
    searchBy: string().required(),
    orderType: string().required(),
    domain: string().required(),
    registryEnterNumber: string().required(),
    district: string().required(),
    bankName: string().required(),
    firstName: string().required(),
    lastName: string(),
    dni: string().required(),
    dniType: string().required(),
    ownerType: string().required(),
  }),
});

export const OrderArrayValidationSchema = array(OrderValidationSchema);
