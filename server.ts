import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import 'dotenv/config';
import { usersRouter } from './src/routes/user.routes';
import { ordersRouter } from './src/routes/orders.routes';
import { connectDB } from './src/db/mongodb';
import { log } from './src/shared/helpers/logger';
import { tempChecker } from './src/shared/helpers/temp';
import { extractToken } from './src/middlewares/identifyUser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use(extractToken);
app.use('/orders', ordersRouter);

// Iniciamos el servidor express
const startServer = async () => {
  await app.listen(process.env.PORT || 8080, () => {
    log.info(`Server running on http://127.0.0.1:${process.env.PORT}`);
  });
};

(async () => {
  await tempChecker();
  await connectDB();
  await startServer();
})();
