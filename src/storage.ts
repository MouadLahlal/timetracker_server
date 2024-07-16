import { Pool } from 'pg';
import { createClient } from 'redis';

const pool = new Pool({
    host: '',
    user: '',
    max: 0,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
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
    id-website
    domain
    id-account

TRACKED-TIME
    id-tt
    day
    time (seconds)
    id-website
    id-account

ACCOUNT
    id-account
    username
    psw-hash
*/