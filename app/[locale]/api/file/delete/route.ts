import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	const filePath = (await req.json()).paths as string | string[];

	if (!filePath) return;

	if (typeof filePath === 'string') {
		if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
		else
			return NextResponse.json({
				message: 'File không tồn tại',
				success: false,
			});
	} else {
		for (let i = 0; i < filePath.length; i++) {
			if (fs.existsSync(filePath[i])) fs.unlinkSync(filePath[i]);
		}
	}
}
