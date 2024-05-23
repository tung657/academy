import { NextRequest, NextResponse } from 'next/server';

import { createBranch } from '@/helpers/repositories/branch.repository';
import { IBranch } from '@/types/branch';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IBranch;
		let dbResults = await createBranch(body);
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
