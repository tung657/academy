import { getBranchDropdown } from '@/helpers/repositories/branch.repository';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
	try {
		let dbResults = await getBranchDropdown();

		if (dbResults) {
			return NextResponse.json(
				dbResults.map((i: any) => ({ ...i, value: i.value + '' })),
			);
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