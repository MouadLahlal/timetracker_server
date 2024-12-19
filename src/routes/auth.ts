import { Router, Request, Response } from 'express';
import { Pool } from '../storage';

const router = Router();

router.post('/login', await (req: Request, res: Response) => {
	const data: User = req.body;
	const db = await pool.connect();

	if (!data) {
		res.json({message: "dati non completi"});
		return;
	}

	if (!db) {
		res.json({message: "server error"});
		return;
	}

	let query = 'SELECT password FROM account WHERE username = $1';
	let result = await db.query(query, [data.usr]);

	// decriptare password (result.rows[0].password) per verificare
	// psw utente.
});

interface User {
	usr: string,
	psw: string
}

router.post('/register', async (req: Request, res: Response) => {
	const data : User = req.body;
});

export default router;
