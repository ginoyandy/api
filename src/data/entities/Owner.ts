import { Schema } from 'mongoose';

export const OwnerSchema = new Schema({
  firstName: String,
  lastName: String,
  dni: String,
  dniType: String,
  ownerType: String,
});
