import { existsSync } from 'fs';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

import { ORIGIN_URL } from '@/utils/config';

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const f = formData.getAll('files');

		if (!f) {
			return NextResponse.json({
				message: 'Cần thêm file với key là files',
				success: false,
			});
		}

		const date = new Date();
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const time = date.getTime().toString();
		const uploadDir = `${year}-${month}-${day}`;

		const destinationDirPath = path.join(
			process.cwd(),
			process.env.STORE_PATH!,
			uploadDir,
		);

		if (!existsSync(destinationDirPath)) {
			await fs.mkdir(destinationDirPath, { recursive: true });
		}

		const result = [];

		for (let i = 0; i < f.length; i++) {
			const file = f[i] as File;
			const fileArrayBuffer = await file.arrayBuffer();
			const [extension, ...props] = file.name.split('.').reverse();
			let filename =
				props.join('.') + `_${year}_${month}_${day}_${time}.${extension}`;

			await fs.writeFile(
				path.join(destinationDirPath, filename),
				Buffer.from(fileArrayBuffer),
			);

			result.push({
				fileName: filename,
				size: file.size,
				lastModified: new Date(file.lastModified),
				url: `${
					process.env.NODE_ENV === 'development' ? '' : ORIGIN_URL
				}/api/file/${btoa(uploadDir + '/' + filename)}`,
				preview: ['mp4'].includes(extension.toLowerCase())
					? `/play?filename=${filename}`
					: undefined,
			});
		}

		return NextResponse.json(result);
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
