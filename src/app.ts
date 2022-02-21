// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express from 'express';
import log from './logger';
import connect from './db/mongodb';
import cors from 'cors';
import routes from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const morgan = require('morgan');
// import { deserializeUser } from './middleware';

const app = express();
// app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
const PORT = process.env.PORT;

app.listen(PORT, () => {
    log.info(`Server listing at http://localhost:${PORT}`);
    //connect();
    routes(app);
});

