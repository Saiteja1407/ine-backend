import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import {constants} from './constants/index.js';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import coursesRouter from './routes/coursesRoutes.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api', userRouter);
app.use('/api', coursesRouter);

app.listen(constants.PORT, () => {
    console.log(`App listening at http://localhost:${constants.PORT}`);
});