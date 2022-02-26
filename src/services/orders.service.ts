import * as XLSX from 'xlsx';
import { Order } from '../data/models/Order';
import {
  addOrder, getOrderById, modifyExistentOrder, getAll,
} from '../repositories/orders.repository';
import { log } from '../shared/helpers/logger';
import { keyMap } from '../shared/order.map';
import { PDF } from './pdf.service';
import { sendEmail } from './email.service';

export const createOrderBody = async (bytesArray: Object) => {
  try {
    // Read the abytes array into a variable.
    const workbook = XLSX.read(bytesArray);

    // Now if the name is undefined, take a string if not take the first sheet.
    const sheetName = workbook.Props?.SheetNames
      ? workbook.Props.SheetNames[0]
      : '';

    // We have only one sheet, let's read it.
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const ordersArray: Order[] = [];
    sheet.forEach((order: any) => {
      const newOrder: any = {};
      keyMap.forEach((key: string, value: string) => {
        let currentValue = order[value];
        if (key === ('orderedDate' || 'informedDate')) {
          currentValue = new Date(
            order[value] * 24 * 60 * 60 * 1000 - 70 * 365 * 24 * 60 * 60 * 1000,
          );
        }
        newOrder[key] = currentValue;
      });
      ordersArray.push(newOrder);
    });
    const filname = `${new Date().toISOString().split('.')[0]}.xlsx`;

    await sendEmail(filname, bytesArray);
    return await addOrder(ordersArray)
      .then((orders) => orders)
      .catch((error) => {
        throw Error(error);
      });
  } catch (e) {
    log.error(e);
    throw Error(e);
  }
};

export const getPDF = async (id: string) => {
  try {
    const pdfData: any = await getOrderById(id);

    const pdf = new PDF();
    const fileName = pdf.makePdf(pdfData);

    await sendEmail(fileName);
    return fileName;
  } catch (e) {
    log.error(e);
    throw Error(e);
  }
};

export const modifyOrder = async (order: Order, orderId: string) => {
  try {
    return await modifyExistentOrder(order, orderId)
      .then((result) => {
        if (result) {
          return result;
        }
        throw Error('Not modified');
      })
      .catch((error) => {
        throw Error(error);
      });
  } catch (e) {
    log.error(e);
    throw Error(e);
  }
};

export const getOrders = async () => {
  try {
    return await getAll();
  } catch (e) {
    log.error(e);
    throw Error(e);
  }
};
