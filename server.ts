import express, { Response, Request } from 'express';
import cors from 'cors';
import { usersRouter } from './src/routes/user.routes';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/ping', (req: Request, res: Response) => res.json({'message': 'ok'}))
app.use('/users', usersRouter);


app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on http://127.0.0.1:${process.env.PORT}`);
});
