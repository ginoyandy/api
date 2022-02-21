import mongoose from 'mongoose';
import log from '../logger/index';

/* DB Keys */
const mongoAppUser = process.env.MONGODB_USER;
const mongoAppKey = process.env.MONGODB_PASSWORD;

function connect() {
    console.log(process.env.NODE_ENV);
    const URL = process.env.NODE_ENV == 'PROD'
       // ? `mongodb+srv://${mongoAppUser}:${mongoAppKey}@cluster0.fxnfi.mongodb.net/db-prod?retryWrites=true&w=majority`
       // : `mongodb+srv://${mongoAppUser}:${mongoAppKey}@cluster0.fxnfi.mongodb.net/db-testing?retryWrites=true&w=majority`;

    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(() => log.info('Succesfully connected with DB'))
        .catch((err) => log.info(err));
}

export default connect;
