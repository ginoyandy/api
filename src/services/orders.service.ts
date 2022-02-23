import * as XLSX from 'xlsx';
import { log } from '../helpers/logger';
import { Order } from '../data/models/order.model';

const keyMap = new Map<string, string>([
  ['REMITO', 'remittance'],
  ['Fecha Envio al Proveedor', 'orderedDate'],
  ['Empresa Proveedora', 'providerFactory'],
  ['Solicitud', 'orderNumber'],
  ['Sucursal', 'office'],
  ['Busqueda', 'searchBy'],
  ['Tramite', 'orderType'],
  ['Denominacion', 'firstName'],
  ['Nro Documento', 'dni'],
  ['Tipo de Persona', 'ownerType'],
  ['Tipo de Documento', 'dniType'],
  ['Domicilio Calle', 'adress'],
  ['Numero', 'streetNumber'],
  ['Piso', 'adressFloor'],
  ['Departamento', 'apartmentNumber'],
  ['Localidad', 'city'],
  ['Dto/Distrito/Partido', 'department'],
  ['Provincia', 'state'],
  ['Matricula N°', 'enrollmentNumber'],
  ['Tomo', 'volumeNumber'],
  ['Folio', 'folioNumber'],
  ['Dominio', 'domain'],
  ['N° entrada a Registro', 'registryEnterNumber'],
  ['Año de Inscripción', 'yearNumber'],
  ['Dpto/Distrito/Partido', 'district'],
  ['Observaciones', 'observations'],
]);

export const createOrderBody = async (bytesArray: Object) => {
  try {
    // Read the abytes array into a variable.
    const workbook = XLSX.read(bytesArray);

    // Now if the name is undefined, take a string if not take the first sheet.
    const sheetName = workbook.Props?.SheetNames ? workbook.Props.SheetNames[0] : '';

    // We have only one sheet, let's read it.
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const ordersArray: Order[] = [];
    sheet.forEach((order: any) => {
      const newOrder: any = {};
      keyMap.forEach((key: string, value: string) => {
        let currentValue = order[value];
        if (key === ('orderedDate' || 'informedDate')) {
          currentValue = new Date((order[value] * 24 * 60 * 60 * 1000) - (70 * 365 * 24 * 60 * 60 * 1000));
        }
        newOrder[key] = currentValue;
      });
      ordersArray.push(newOrder);
    });
    return ordersArray;
  } catch (e) {
    log.error(e);
    return e.message;
  }
};
