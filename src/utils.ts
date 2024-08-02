import { pool } from './storage';

function getDateString() {
    let today = new Date();
    let todayDate = today.getDate();
    //return `${today.getFullYear()}-${today.getMonth() + 1}-${todayDate < 10 ? `0${todayDate}` : todayDate}`;
	return `${todayDate}.${today.getMonth() +1}.${today.getFullYear()}`;
}

async function websiteInDb(domain: string) {
	let exists = await pool.query('SELECT * FROM website WHERE domain = $1', [domain]);
	return exists.rowCount && exists.rowCount > 0 ? true : false;
}

export {
    getDateString,
	websiteInDb
}
