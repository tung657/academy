import { NextRequest, NextResponse } from 'next/server';

import { searchPosition } from '@/helpers/repositories/position.repository';
import { ISearchPosition } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = (await request.json()) as ISearchPosition;

		let dbResults = await searchPosition(body);

		if (dbResults) {
			return NextResponse.json({
				totalItems: Math.ceil(
					dbResults && dbResults.length > 0 ? dbResults[0].RecordCount : 0,
				),
				page: body.page_index,
				page_size: body.page_size,
				data: dbResults,
				pageCount: Math.ceil(
					(dbResults && dbResults.length > 0 ? dbResults[0].RecordCount : 0) /
						(body.page_size ? body.page_size : 1),
				),
			});
		} else {
			return NextResponse.json({
				message: 'Không tồn tại kết quả tìm kiếm',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ success: false, message: error.message });
	}
}
