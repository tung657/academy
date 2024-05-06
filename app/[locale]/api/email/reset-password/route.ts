import { getJwtSecretKey } from '@/helpers/auth';
import { system_email } from '@/helpers/email-config';
import { checkEmployeeEmail } from '@/helpers/repositories/user.repository';
import { resetPasswordTemplate } from '@/libs/email-templates/resetPasswordTemplate';
import { VERIFY_RESET_PASSWORD_URL } from '@/libs/urls';
import { SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const email = body.email;

		if (!email)
			return NextResponse.json({
				message: 'Email không thể để trống!',
				success: false,
			});

		const verifyEmail = await checkEmployeeEmail(email);

		if (!verifyEmail)
			return NextResponse.json({
				message: 'Vui lòng kiểm tra hòm thư!',
				success: true,
			});

		let mailHost = 'smtp.gmail.com';
		let mailPort = 587;
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: mailHost,
			port: mailPort,
			secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
			// service: 'gmail',
			auth: {
				user: system_email.email, // generated ethereal user
				pass: system_email.password, // generated ethereal password
			},
		});

		const token = await new SignJWT({ id: verifyEmail })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime(`10m`)
			.sign(getJwtSecretKey());

		// send mail with defined transport object
		await transporter.sendMail({
			from: 'AIA <' + system_email.email + '>', // sender address
			to: email, // sender address
			subject: `[AIA] - Yêu cầu cấp lại mật khẩu`, // Subject line
			// text: 'Hello world?', // plain text body
			html: resetPasswordTemplate({
				url: `${body.url}/${VERIFY_RESET_PASSWORD_URL}?token=${token}`,
			}), // html body
		});

		return NextResponse.json({
			message: 'Vui lòng kiểm tra hòm thư!',
			success: true,
		});
	} catch (err: any) {
		return NextResponse.json({
			message: err.message,
			success: false,
		});
	}
}
