import { MD5 } from 'crypto-js';
import { NextRequest, NextResponse } from 'next/server';

import { resetPassword } from '@/helpers/repositories/user.repository';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const { employee_id } = (await request.json()) as any;
		const password = makeId(8);

		if (employee_id) {
			const new_password = MD5(password).toString();
			const result = await resetPassword(employee_id, new_password);
			if (result)
				return NextResponse.json({
					message: 'Đã reset mật khẩu thành công',
					data: password,
					success: true,
				});
			else
				return NextResponse.json({
					message: 'Tháo tác thất bại',
					success: false,
				});
		} else {
			return NextResponse.json({
				message: 'Không tồn tại email này',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}

function makeId(length: number) {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}
