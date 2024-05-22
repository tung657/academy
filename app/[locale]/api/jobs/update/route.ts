import { NextRequest, NextResponse } from 'next/server';

import { updateJob } from '@/helpers/repositories/job.repository';
import { IJob } from '@/types/job';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IJob;
		let dbResults = await updateJob(body);
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
