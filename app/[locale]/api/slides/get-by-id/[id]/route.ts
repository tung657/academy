import { getSlideByIdRepo } from '@/helpers/repositories/slide.repository';
import { NextRequest, NextResponse as res } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
	_: NextRequest,
	{ params }: { params: { id: string } },
): Promise<res> {
	try {
		const id = params.id;
		const slide = await getSlideByIdRepo(id);
		if (slide) {
			return res.json(slide);
		} else {
			return res.json({ message: 'Bản ghi không tồn tại', success: false });
		}
	} catch (error: any) {
		return res.json({ message: error.message, success: false });
	}
}
