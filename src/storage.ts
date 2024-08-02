import { Pool } from 'pg';
import { createClient } from 'redis';

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
	password: 'password',
	database: 'postgres',
	port: 5432
});

pool.on('error', (err: Error, client) => {
	console.log(err.message);
});

async function getRedis() {
    const client = createClient();
    await client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();

    return client;
}

export {
    pool,
    getRedis
}


/*
WEBSITE
    id
    domain
    // id-account

TRACKEDTIME
    id
    day
    time (seconds)
    id_website
    // id-account

*for now it won't be implemented*
ACCOUNT
    id-account
    username
    psw-hash
*/
