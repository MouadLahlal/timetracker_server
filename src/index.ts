import express, { Request, Response } from 'express';
import websiteRoute from './routes/website';
import timeRoute from './routes/time';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors<Request>());

app.use('/test', websiteRoute);
app.use('/time', timeRoute);

app.listen(port, () => {
    console.log(`Started listening at http://localhost:${port}`);
});