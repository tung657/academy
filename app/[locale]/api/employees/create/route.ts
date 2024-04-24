import { createEmployee } from '@/helpers/repositories/user.repository';
import { IUser } from '@/types';
import { MD5 } from 'crypto-js';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IUser;
		body.user_id = crypto.randomUUID();
		body.profile_id = crypto.randomUUID();
		body.user_role_id = crypto.randomUUID();
		body.password = MD5(body.password || '123456').toString();
		let dbResults = await createEmployee(body);
		if (dbResults) {
			return NextResponse.json({
				message: 'Thêm mới thành công',
				success: true,
			});
		} else {
			return NextResponse.json({
				message: 'Thêm mới thất bại',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
