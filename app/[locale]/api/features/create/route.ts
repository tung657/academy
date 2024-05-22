import { NextRequest, NextResponse } from 'next/server';

import { createFeatureRepository } from '@/helpers/repositories/feature.repository';
import { IFeature } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IFeature;
		let dbResults = await createFeatureRepository(body);
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
