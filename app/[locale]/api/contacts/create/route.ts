import { NextRequest, NextResponse } from 'next/server';

import { createContact } from '@/helpers/repositories/contact.repository';
import { IContact } from '@/types/contact';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as IContact;
		let dbResults = await createContact(body);
		if (dbResults) {
			return NextResponse.json({
				message: 'Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.',
				success: true,
			});
		} else {
			return NextResponse.json({
				message: 'Vui lòng thử lại sau!',
				success: false,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ message: error.message, success: false });
	}
}
