import { NextResponse, NextRequest } from 'next/server';
import { SignJWT } from 'jose';

import { getJwtSecretKey, setUserDataCookie } from '@/helpers/auth';
import { authenticateRepo } from '@/helpers/repositories';
import { MD5 } from 'crypto-js';
import { LOCAL_TOKEN } from '@/utils';

export interface I_ApiUserLoginRequest {
	user_name: string;
	password: string;
	tsToken: string;
	code?: string;
}

export const dynamic = 'force-dynamic';

// Create a POST endpoint
export async function POST(request: NextRequest) {
	const body = (await request.json()) as I_ApiUserLoginRequest;

	// trim all input values
	const { user_name, password } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value?.trim()]),
	) as I_ApiUserLoginRequest;

	if (!user_name || !password) {
		const res = {
			success: false,
			message: 'Vui lòng điền tài khoản hoặc mật khẩu',
		};

		return NextResponse.json(res, { status: 400 });
	}

	try {
		// Fetch our user from the database
		const user = await authenticateRepo(user_name, MD5(password).toString());
		if (!user) {
			return NextResponse.json({
				success: false,
				message: 'Thông tin tài khoản không chính xác',
			});
		}

		// Check if user is active
		// if (user.status !== 'active') throw new Error('User account is not active');

		/** Check TFA status, reject login and send code */

		// Create and sign our JWT
		const token = await new SignJWT({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
			role: user.role,
		})
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
			path: '/', // Accessible site-wide
			maxAge: 86400, // 24-hours or whatever you like
			httpOnly: true, // This prevents scripts from accessing
			sameSite: 'strict', // This does not allow other sites to access
		});

		// Store public user data as a cookie
		// const userData = user.exportPublic();
		setUserDataCookie(user);

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
