import { NextRequest, NextResponse } from 'next/server';

import { getCVById } from '@/helpers/repositories/cv.repository';

export const dynamic = 'force-dynamic';

export async function GET(
	_: NextRequest,
	{ params }: { params: { id: string } },
): Promise<NextResponse> {
	try {
		const id = params.id;
		const data = await getCVById(+id);
		if (data) {
			return NextResponse.json(data);
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
