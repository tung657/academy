import { createActionRepository } from '@/helpers/repositories/action.repository';
import { IAction } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IAction;
		let dbResults = await createActionRepository(body);
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
