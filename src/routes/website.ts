import { Router, Request, Response } from "express";
import { Website } from "../models/website";
import { pool, getRedis } from "../storage";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const data: Website = req.body;

        const client = await getRedis();

        for (const domain in data) {
            let value;
            if (await client.exists(domain)) {
                value = JSON.parse(await client.get(domain) || "");
                for (const day in data[domain]) {
                    if (value[day]) {
                        value[day] += data[domain][day];
                    } else {
                        value[day] = data[domain][day];
                    }
                }
            } else {
                value = data[domain];
            }
            await client.set(domain, JSON.stringify(value));
        }

        for (const domain in data) {
            let value = await client.get(domain) || "";
            console.log(domain.toUpperCase());
            console.log(`${JSON.stringify(JSON.parse(value), null, 4)}`); 
        }

        // can i remove await 'cause i don't need to wait for redis client to disconnect
        await client.disconnect();

        res.send("ok");
    } catch (error) {
        res.send(error);
    }
});

export default router;