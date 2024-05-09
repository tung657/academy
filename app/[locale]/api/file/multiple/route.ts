import { NextRequest, NextResponse } from 'next/server';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		// console.log(formData);

		const f = formData.getAll('files');

		if (!f) {
			return NextResponse.json({
				message: 'Cần thêm file với key là files',
				success: false,
			});
		}

		// const file = f as File;
		// console.log(`File name: ${file.name}`);
		// console.log(`Content-Length: ${file.size}`);

		const date = new Date();
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const uploadDir = `${year}-${month}-${day}`;

		const destinationDirPath = path.join(
			process.cwd(),
			process.env.STORE_PATH!,
			uploadDir,
		);
		// console.log('destinationDirPath: ', destinationDirPath);

		// const fileArrayBuffer = await file.arrayBuffer();

		if (!existsSync(destinationDirPath)) {
			await fs.mkdir(destinationDirPath, { recursive: true });
		}

		const result = [];

		for (let i = 0; i < f.length; i++) {
			const file = f[i] as File;
			const fileArrayBuffer = await file.arrayBuffer();
			let filename = file.name;
			while (existsSync(path.join(destinationDirPath, filename))) {
				filename = `(1)` + filename;
			}

			await fs.writeFile(
				path.join(destinationDirPath, filename),
				Buffer.from(fileArrayBuffer),
			);

			const [extension] = filename.split('.').reverse();

			result.push({
				fileName: file.name,
				size: file.size,
				lastModified: new Date(file.lastModified),
				url: `/api/file/${file.name}`,
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
