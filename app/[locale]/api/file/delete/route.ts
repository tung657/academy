import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	try {
		const filePath = (await req.json()).paths as string | string[];

		if (!filePath) return;

		if (typeof filePath === 'string') {
			const names = filePath.split('/');
			const p = path.join(
				process.cwd(),
				process.env.STORE_PATH!,
				filePath.includes('.')
					? names[names.length - 2] + '/' + names[names.length - 1] // Get path with normal path
					: atob(names[names.length - 1]), // Get with encoded path
			);
			if (fs.existsSync(p)) fs.unlinkSync(p);
			else
				return NextResponse.json({
					message: 'File không tồn tại',
					success: false,
				});
		} else {
			for (let i = 0; i < filePath.length; i++) {
				const names = filePath[i].split('/');
				const p = path.join(
					process.cwd(),
					process.env.STORE_PATH!,
					filePath[i].includes('.')
						? names[names.length - 2] + '/' + names[names.length - 1] // Get path with normal path
						: atob(names[names.length - 1]), // Get with encoded path
				);
				if (fs.existsSync(p)) fs.unlinkSync(p);
			}
		}

		return NextResponse.json({
			message: 'Xóa thành công',
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
