import { pool, getRedis } from './storage';
import { getDateString, websiteInDb } from './utils';

function log(msg: any) {
	console.log(`${getDateString()} -- ${typeof msg === "string" ? msg : JSON.stringify(msg)}`);
}

async function redisToDb () {
	const redis = await getRedis();
    const db = await pool.connect();
    const today = getDateString();

    for await (const key of redis.scanIterator()) {
		let transaction = await redis
			.multi()
			.get(key)
			.del(key)
			.exec();

		let data = JSON.parse(`${transaction[0]}` || '');
		
		if (!await websiteInDb(key)) {
			await db.query('INSERT INTO website (domain) VALUES ($1)', [key]);
		}

        for (const day in data) {
			let res = await db.query('SELECT time FROM trackedtime WHERE id_website = ( SELECT id FROM website WHERE domain = $1 ) AND day = $2', [key, day]);
        	
			if (res.rowCount && res.rowCount > 0) {
				let newtime = res.rows[0].time + data[day];
				await db.query('UPDATE trackedtime SET time = $1 WHERE id_website = ( SELECT id FROM website WHERE domain = $2 ) AND day = $3', [newtime, key, day]);
			} else {
				await db.query('INSERT INTO trackedtime (time, day, id_website) VALUES ($1, $2, (SELECT id FROM website WHERE domain = $3))', [data[day], day, key]);
			}
        }
    }

	db.release();
}

export {
    redisToDb
}
