import { searchFeatureRepository } from '@/helpers/repositories/feature.repository';
import { ISearchFeatures } from '@/types';
import { getFeatureTree, searchFeatureTree } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const body = (await request.json()) as ISearchFeatures;

		let dbResults = await searchFeatureRepository(body);
		if (body.search_content) dbResults = await searchFeatureTree(dbResults);
		let data = getFeatureTree(dbResults, 1, 0); //this.getResultTree(dbResults, 1, "0");

		return NextResponse.json(data);
	} catch (error: any) {
		return NextResponse.json({ success: false, message: error.message });
	}
}