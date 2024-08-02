import express, { Request, Response } from 'express';
import extensionRoute from './routes/extension';
import timeRoute from './routes/time';
import cors from 'cors';
import cron from 'node-cron';
import { redisToDb } from './cron';

const app = express();
const port = process.env.PORT || 3000;

cron.schedule('0 */1 * * *', redisToDb); // every hour
//cron.schedule('* * * * *', redisToDb); // every minute

app.use(express.json());
app.use(cors<Request>());

app.use('/test', extensionRoute);
app.use('/time', timeRoute);

app.listen(port, () => {
    console.log(`Started listening at http://localhost:${port}`);
});
