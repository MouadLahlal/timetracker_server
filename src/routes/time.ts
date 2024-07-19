import { Router, Request, Response } from "express";
import { getRedis } from "../storage";
import { getDateString } from "../utils";

const router: Router = Router();

// TODO : clean redis cache so that it contains only today data
router.get('/today', async (req: Request, res: Response) => {
    const client = await getRedis();
    let memory: {[key:string]:string} = {};
    let today: string = getDateString();
    
    for await (const key of client.scanIterator()) {
        memory[key] = JSON.parse(await client.get(key) || "")[today];
    }
    
    res.json(memory);
});

// this endpoint will return data from database
router.get('/week', async (req: Request, res: Response) => {});

export default router;