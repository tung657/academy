import { updateFeatureRepository } from '@/helpers/repositories/feature.repository';
import { IFeature } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest) {
	try {
		const body = (await request.json()) as IFeature;
		let dbResults = await updateFeatureRepository(body);
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
