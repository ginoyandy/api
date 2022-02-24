import * as XLSX from 'xlsx';
import { log } from '../shared/helpers/logger';
import { Order } from '../data/models/Order';
import { addOrder } from '../repositories/orders.repository';
import { keyMap } from '../shared/order.map';
import { uploadFile } from './files.service';
import { result } from 'lodash';

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
    const filname = `${new Date().toISOString().split('.')[0]}.xlsx`;

    const returnObject: any = {
      uploaded: [],
      orders: [],
    };
    await uploadFile(bytesArray, filname, false)
      .then((x) => returnObject.uploaded = x);
    return await addOrder(ordersArray)
      .then((x) => returnObject.orders = x)
      .catch((error) => log.error(error))
      .finally(() => returnObject);
  } catch (e) {
    log.error(e);
    return e.message;
  }
};
