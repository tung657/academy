import { NextRequest, NextResponse } from 'next/server';

import { deleteContact } from '@/helpers/repositories/contact.repository';
import { IBaseDelete } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const { list_json, lu_user_id } = (await request.json()) as IBaseDelete;
		let dbResults = await deleteContact(list_json, lu_user_id);
		if (dbResults) {
			return NextResponse.json({
				message: 'Xoá thành công',
				success: true,
			});
		} else {
			return NextResponse.json({
				message: 'Xoá thất bại',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
