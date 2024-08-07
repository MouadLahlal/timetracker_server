import { pool } from './storage';

function getDateString(date?: Date) {
    let today = date ? date : new Date();
    let day = today.getDate();
	let month = today.getMonth()+1;
	return `${today.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}

async function websiteInDb(domain: string) {
	let exists = await pool.query('SELECT * FROM website WHERE domain = $1', [domain]);
	return exists.rowCount && exists.rowCount > 0 ? true : false;
}

export {
    getDateString,
	websiteInDb
}
