import { createRolePermission } from '@/helpers/repositories/role-permission.repository';
import { IPermissionCreate } from '@/types/permission';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IPermissionCreate;
		for (let permission of body.role_permission_list)
			permission.role_permission_id = randomUUID();

		let dbResults = await createRolePermission(
			body.role_permission_list,
			body.created_by_user_id,
		);
		if (dbResults) {
			return NextResponse.json({
				message: 'Cập nhật thành công',
				success: true,
			});
		} else {
			return NextResponse.json({
				message: 'Cập nhật thất bại',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
