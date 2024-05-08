import { NextRequest, NextResponse } from 'next/server';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	// console.log(formData);

	const f = formData.get('file');

	if (!f) {
		return NextResponse.json({}, { status: 400 });
	}

	const file = f as File;
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

	const fileArrayBuffer = await file.arrayBuffer();

	if (!existsSync(destinationDirPath)) {
		await fs.mkdir(destinationDirPath, { recursive: true });
	}

	let filename = file.name;
	while (existsSync(path.join(destinationDirPath, filename))) {
		filename = `(1)` + filename;
	}

	await fs.writeFile(
		path.join(destinationDirPath, filename),
		Buffer.from(fileArrayBuffer),
	);

	const [extension] = filename.split('.').reverse();

	return NextResponse.json({
		fileName: file.name,
		size: file.size,
		lastModified: new Date(file.lastModified),
		url: `${req.nextUrl.origin}/api/file/${btoa(uploadDir + '/' + file.name)}`,
		preview: ['mp4'].includes(extension.toLowerCase())
			? `/play?filename=${filename}`
			: undefined,
	});
}
