import { NextRequest, NextResponse } from 'next/server';

import { getResearchByParent } from '@/helpers/repositories/research.repository';

export const dynamic = 'force-dynamic';

export async function GET(
	_: NextRequest,
	{ params }: { params: { id: string } },
): Promise<NextResponse> {
	try {
		const id = params.id;
		const dbResults = await getResearchByParent(+id);

		if (dbResults) {
			return NextResponse.json({
				data: dbResults,
			});
		} else {
			return NextResponse.json({
				message: 'Không tồn tại kết quả tìm kiếm',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
