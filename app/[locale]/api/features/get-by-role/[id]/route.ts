import { NextRequest, NextResponse } from 'next/server';

import { getFeaturesByRoleIdRepository } from '@/helpers/repositories/feature.repository';

export const dynamic = 'force-dynamic';

export async function GET(
	_: NextRequest,
	{ params }: { params: { id: string } },
): Promise<NextResponse> {
	try {
		const id = params.id;
		const slide = await getFeaturesByRoleIdRepository(+id);
		if (slide) {
			return NextResponse.json(slide);
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
