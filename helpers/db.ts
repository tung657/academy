'use server';

import { PoolConnection, PoolOptions, createPool } from 'mysql2/promise';

const connectionConfig: PoolOptions = {
	host: process.env.NEXT_PUBLIC_MYSQL_HOST,
	port: +(process.env.NEXT_PUBLIC_MYSQL_PORT || 14306),
	database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
	user: process.env.NEXT_PUBLIC_MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	enableKeepAlive: true,
};

// export class Database {
// 	private pool: Pool;

// 	constructor() {
// 		this.pool = createPool(connectionConfig);
// 	}
// }
export async function query(sql: string, values: any[]): Promise<any> {
	let connection: PoolConnection | null = null;
	const pool = createPool(connectionConfig);
	try {
		connection = await pool.getConnection();
		const [results] = await connection.query(sql, values);
		const [outParam] = await connection.query('SELECT @err_code, @err_msg');
		let err: any = outParam;
		if (err[0]['@err_code'] === 0) {
			return results;
		} else {
			throw new Error(err?.[0]?.['@err_msg']);
		}
	} catch (error) {
		throw error;
	} finally {
		if (connection) {
			connection.release();
		}
	}
}

export async function queryList(sql: string, values: any[]): Promise<any> {
	let connection: PoolConnection | null = null;
	const pool = createPool(connectionConfig);
	try {
		connection = await pool.getConnection();
		const [results] = await connection.query(sql, values);
		const [outParam] = await connection.query('SELECT @err_code, @err_msg');
		let err: any = outParam;
		if (err[0]['@err_code'] === 0) {
			return results;
		} else {
			throw new Error(err[0]['@err_msg']);
		}
	} catch (error) {
		throw error;
	} finally {
		if (connection) {
			connection.release();
		}
	}
}
