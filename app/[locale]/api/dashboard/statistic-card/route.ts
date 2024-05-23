import { NextRequest, NextResponse } from 'next/server';

import { statisticCard } from '@/helpers/repositories/dashboard.repository';

export const dynamic = 'force-dynamic';

export async function GET(_: NextRequest): Promise<NextResponse> {
	try {
		const data = await statisticCard();
		if (data) {
			return NextResponse.json({ data });
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
