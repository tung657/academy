import { NextResponse, NextRequest } from 'next/server';
import { SignJWT } from 'jose';

import { getJwtSecretKey, setUserDataCookie } from '@/helpers/auth';
import { MD5 } from 'crypto-js';
import { authenticateRepository } from '@/helpers/repositories/user.repository';
import { LOCAL_TOKEN } from '@/utils/config';

export interface IApiUserLoginRequest {
	user_name: string;
	password: string;
	tsToken: string;
	code?: string;
}

export const dynamic = 'force-dynamic';

// Create a POST endpoint
export async function POST(request: NextRequest) {
	const body = (await request.json()) as IApiUserLoginRequest;

	// trim all input values
	const { user_name, password: pwd } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value?.trim()]),
	) as IApiUserLoginRequest;

	if (!user_name || !pwd) {
		const res = {
			success: false,
			message: 'Vui lòng điền tài khoản hoặc mật khẩu',
		};

		return NextResponse.json(res, { status: 400 });
	}

	try {
		// Fetch our user from the database
		const user = await authenticateRepository(user_name, MD5(pwd).toString());
		if (!user) {
			return NextResponse.json({
				success: false,
				message: 'Thông tin tài khoản không chính xác',
			});
		}

		// let features = await getFunctionByUserIdRepository(user.user_id);
		// let featureTree = getFeatureTree(features, 1, 0);

		const userModal = {
			user_id: user.user_id,
			first_name: user.first_name,
			last_name: user.last_name,
			full_name: user.full_name,
			avatar: user.avatar,
			email: user.email,
			phone_number: user.phone_number,
			position_id: user.position_id,
		};
		// Create and sign our JWT
		const token = await new SignJWT(userModal)
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime(`1d`)
			.sign(getJwtSecretKey());

		// create our response object
		const res = {
			success: true,
			message: 'Đăng nhập thành công',
		};

		const response = NextResponse.json(res);

		// Store our JWT as a secure, HTTP-only cookie
		// response.cookies.set({
		response.cookies.set({
			name: LOCAL_TOKEN,
			value: token,
			path: '/admin/', // Accessible site-wide
			maxAge: 86400, // 24-hours or whatever you like
			// httpOnly: true, // This prevents scripts from accessing
			sameSite: 'strict', // This does not allow other sites to access
		});

		// response.cookies.set({
		// 	name: LOCAL_TOKEN,
		// 	value: token,
		// 	path: '/login', // Accessible site-wide
		// 	maxAge: 86400, // 24-hours or whatever you like
		// 	// httpOnly: true, // This prevents scripts from accessing
		// 	sameSite: 'strict', // This does not allow other sites to access
		// });

		// Store public user data as a cookie
		// const userData = user.exportPublic();
		const { password, ...dataUser } = user;
		setUserDataCookie({ ...dataUser });

		return response;
	} catch (error: any) {
		// log.error(error);

		const res = {
			success: false,
			message: error.message || 'Something went wrong',
		};

		return NextResponse.json(res, { status: 500 });
	}
}
