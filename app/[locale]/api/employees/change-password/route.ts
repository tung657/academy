import { changePassword } from '@/helpers/repositories/user.repository';
import { MD5 } from 'crypto-js';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as any;
		// const passwordRegex =
		// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (body.old_password == null)
			throw new Error('Mật khẩu hiện tại không thể để trống');
		if (body.new_password == null)
			throw new Error('Mật khẩu mới không thể để trống');
		if (body.lu_user_id == null)
			throw new Error('lu_user_id không thể để trống');
		// const isValidPassword = passwordRegex.test(body.new_password);
		// if (!isValidPassword)
		// 	throw Error(
		// 		'Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ hoa, chữ thường, và ít nhất một kí tự đặc biệt và số',
		// 	);
		body.old_password = MD5(body.old_password).toString();
		body.new_password = MD5(body.new_password).toString();
		let dbResults = await changePassword(body);
		if (dbResults) {
			return NextResponse.json({
				message: 'Cập nhật thành công',
				success: true,
			});
		} else {
			return NextResponse.json({
				message: 'Bản ghi không tồn tại',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
