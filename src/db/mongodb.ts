import mongoose from 'mongoose';
import { log } from '../helpers/logger';

export const connectDB = async () => {
  const databaseURI = process.env.DATABASE_URI || 'development';
  await mongoose
    .connect(databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => log.info('Succesfully connected with DB'))
    .catch((err) => log.err(err));
};
