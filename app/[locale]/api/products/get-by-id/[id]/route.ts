import { NextRequest, NextResponse } from 'next/server';

import { getProductById } from '@/helpers/repositories/product.repository';

export const dynamic = 'force-dynamic';

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
): Promise<NextResponse> {
	try {
		const id = params.id;
		const isClient = req.nextUrl.searchParams.get('isClient') || false;
		const product = await getProductById(+id, Boolean(isClient));
		if (product) {
			return NextResponse.json(product);
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
