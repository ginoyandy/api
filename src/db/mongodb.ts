import mongoose from 'mongoose';
import { log } from '../shared/helpers/logger';

const DB_USER = process.env.MONGODB_USER;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;
const DB_NAME = process.env.ENVIROMENT === 'PRODUCTION'
  ? 'HQ-Asociados-PROD'
  : 'HQ-Asociados-TEST';

export const connectDB = async () => {
  const databaseURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@hyqasociados.xaoje.mongodb.net/${DB_NAME}?retryWrites=true&w=majority;`;
  log.info(`Database URI = ${databaseURI}`);
  await mongoose
    .connect(databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => log.info('Succesfully connected with DB'))
    .catch((err) => log.error(err));
};
