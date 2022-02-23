import express from 'express';
import cors from 'cors';
import { usersRouter } from './src/routes/user.routes';
import 'dotenv/config';
import { ordersRouter } from './src/routes/order.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/orders', ordersRouter);
app.use('/users', usersRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on http://127.0.0.1:${process.env.PORT}`);
});
