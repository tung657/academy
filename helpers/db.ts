import { Pool, PoolConnection, PoolOptions, createPool } from 'mysql2/promise';

const connectionConfig: PoolOptions = {
	host: process.env.NEXT_PUBLIC_MYSQL_HOST,
	port: +(process.env.NEXT_PUBLIC_MYSQL_PORT || 14306),
	database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
	user: process.env.NEXT_PUBLIC_MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	enableKeepAlive: true,
	connectionLimit: 20,
};

let globalPool: Pool | undefined = undefined;

const registerService = (name: string, initFn: () => {}) => {
	if (process.env.NODE_ENV === 'development') {
		if (!(name in global)) {
			// @ts-ignore
			global[name] = initFn();
		}
		// @ts-ignore
		return global[name];
	}
	return initFn();
};

export async function connect(): Promise<PoolConnection> {
	// If the pool was already created, return it instead of creating a new one.
	if (typeof globalPool !== 'undefined') {
		return globalPool.getConnection();
	}

	// If we have gotten this far, the pool doesn't exist, so lets create one.
	globalPool = createPool(connectionConfig);
	return globalPool.getConnection();
}

export async function query(sql: string, values: any[]): Promise<any> {
	let connection = await registerService('db', connect);
	try {
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
		connection?.release();
	}
}

export async function queryList(sql: string, values: any[]): Promise<any> {
	let connection = await connect();
	try {
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
		connection?.release();
	}
}
