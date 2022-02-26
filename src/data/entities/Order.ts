import { Schema } from 'mongoose';
import { OwnerSchema } from './Owner';

export const OrderSchema = new Schema({
  orderedDate: Date,
  orderNumber: String,
  owners: [OwnerSchema],
  adress: String,
  streetNumber: String,
  adressFloor: String,
  apartmentNumber: String,
  city: String,
  department: String,
  state: String,
  enrollmentNumber: Number,
  folioNumber: Number,
  volumeNumber: Number,
  yearNumber: Number,
  observations: String,
  orderAmmount: Number,
  informedDate: Date,
  totalArea: Number,
  office: String,
  remittance: String,
  providerFactory: String,
  searchBy: String,
  orderType: String,
  domain: String,
  registryEnterNumber: String,
  district: String,
  bankName: String,
  firstName: String,
  lastName: String,
  dni: String,
  dniType: String,
  ownerType: String,
});
