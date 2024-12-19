import { Router, Request, Response } from "express";
import { Website } from "../models/website";
import { pool, getRedis } from "../storage";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const data: Website = req.body;
        const client = await getRedis();

        for (const domain in data) {
			//console.log(domain);
            let value = JSON.parse(await client.get(domain) || "{}");
            for (const day in data[domain]) {
                value[day] = (value[day] || 0) + data[domain][day];
            }
            await client.set(encodeURIComponent(domain), JSON.stringify(value));
        }

        await client.disconnect();

        res.status(200).json({
            message: "Time tracked successfully"
        });
    } catch (error) {
        res.send(error);
    }
});

export default router;

