import express, { Request, Response } from 'express';
import websiteRoute from "./routes/website";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors<Request>());

app.get("/", (req: Request, res: Response) => {
    res.send("Less go");
});

app.use("/test", websiteRoute);

app.listen(port, () => {
    console.log(`Started listening at http://localhost:${port}`);
});