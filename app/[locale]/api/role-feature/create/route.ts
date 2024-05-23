import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import { createRoleFeature } from '@/helpers/repositories/role-feature.repository';
import { ICreateRoleFeature } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as ICreateRoleFeature;
		for (let role of body.role_function_list) {
			role.role_function_id = randomUUID();
		}

		let dbResults = await createRoleFeature(body);
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
