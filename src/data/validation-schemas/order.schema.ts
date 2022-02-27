import {
  object, string, number, array, date,
} from 'yup';

export const OrderValidationSchema = object({
  body: object({
    orderedDate: date().required('Fecha de orden requerida. '),
    orderNumber: string().required('Número de orden requerido. '),
    owners: array(
      object({
        firstName: string().required('Nombre de propietario requerido. '),
        lastName: string(),
        dni: string().required('DNI requerido. '),
      }),
    ),
    adress: string().required('La dirección es requerida. '),
    streetNumber: string().required('La dirección es requerida. '),
    adressFloor: string().required('La dirección es requerida. '),
    apartmentNumber: string().required('La dirección es requerida. '),
    city: string().required('Nombre de ciudad requerido. '),
    department: string().required('Departamento requerido. '),
    state: string().required('Provincia requerida.'),
    enrollmentNumber: number().required('El número de matrícula es requerido. '),
    folioNumber: number().required('El número de folio es requerido. '),
    volumeNumber: number().required('El número de tomo es requerido. '),
    yearNumber: number().required('El año es requerido. '),
    observations: string().required('Es necesario que hagas observaciones para continuar. '),
    orderAmmount: number().required('Debés definir un monto.'),
    informedDate: date().required('La fecha de informe es requerida. '),
    totalArea: number().required('Es necesario que precises el área. '),
    office: string().required('El campo oficina es requerido. '),
    remittance: string().required('Es necesario que especifiques el numero de remito. '),
    providerFactory: string().required('Es necesario que indiques el proveedor. '),
    searchBy: string().required('Es necesario que indiques este campo. '),
    orderType: string().required('El tipo de orden es requerido. '),
    domain: string().required('El dominio es requerido. '),
    registryEnterNumber: string().required('El numero de entrada de registro es requerido. '),
    district: string().required('El distrito es requerido. '),
    bankName: string().required('Por favor especifique el nombre del banco. '),
    firstName: string().required('Especifique nombre. '),
    lastName: string(),
    dni: string().required('Especifique DNI. '),
    dniType: string().required('Especifique tipo de DNI. '),
    ownerType: string().required('Especifique tipo de persona. '),
  }),
});

export const OrderArrayValidationSchema = array(OrderValidationSchema);
