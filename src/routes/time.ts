import { Router, Request, Response } from "express";
import { pool, getRedis } from "../storage";
import { getDateString } from "../utils";

const router: Router = Router();

// TODO : clean redis cache so that it contains only today data
router.get('/today', async (req: Request, res: Response) => {
    const client = await getRedis();
    let memory: {[key:string]:number} = {};
    let today: string = getDateString();
    
    for await (const key of client.scanIterator()) {
        memory[key] = JSON.parse(await client.get(key) || "")[today];
    }

	let data = await pool.query('SELECT * FROM trackedtime JOIN website ON trackedtime.id_website = website.id WHERE day = $1', [today]);
	for (const row of data.rows) {
		if (memory[row.domain]) {
			memory[row.domain] += row.time;
		} else {
			memory[row.domain] = row.time;
		}
	}

	let entries = Object.entries(memory);
	entries.sort((a, b) => b[1]-a[1]);
	memory = Object.fromEntries(entries);
    
    res.json(memory);
});

// this endpoint will return data from database
router.get('/week', async (req: Request, res: Response) => {
	const db = await pool.connect();

	let data = await db.query('SELECT * FROM trackedtime JOIN website ON trackedtime.id_website = website.id WHERE day > $1', [getDateString(new Date(Date.now() - 604800000))]);

	//console.log(getDateString(new Date(Date.now() - 604800000)));
	res.json(data);

});

export default router;
