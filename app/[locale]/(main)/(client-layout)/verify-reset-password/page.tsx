import { VerifyPwd } from '@/components/admin/verify/VerifyPwd';
import { TitleRender } from '@/components/mantines/typographies/TitleRender';
import { verifyJwtToken } from '@/helpers/auth';
import { AppConfig } from '@/utils/config';
import { getNewPw } from '@/utils/services/user.service';
import { Box, Card, Center, Container, PinInput, Stack } from '@mantine/core';
import { decodeJwt } from 'jose';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
	return {
		title: `Xác nhận mật khẩu | ${AppConfig.name}`,
		description: `Viện trí tuệ nhân tạo việt nam`,
	};
}

export default async function ResearchPage({ searchParams }: any) {
	if (!searchParams.token) notFound();

	if (!(await verifyJwtToken(searchParams.token))) notFound();

	// console.log(await decodeJwt(searchParams.token));
	const newPwd = await getNewPw(decodeJwt(searchParams.token)?.id + '');

	return (
		<Container size={'xl'}>
			<Box p={80}>
				<Center>
					<Stack>
						<TitleRender order={2} ta={'center'}>
							{newPwd?.success ? 'Mật khẩu mới của bạn' : 'Có lỗi xảy ra'}{' '}
						</TitleRender>
						<Card shadow="sm" p={40}>
							{newPwd?.success ? (
								<>
									<PinInput
										radius={'sm'}
										value={newPwd.data}
										length={newPwd.data?.length}
									/>
									<VerifyPwd value={newPwd.data} />
								</>
							) : (
								<p>{newPwd?.message}</p>
							)}
						</Card>
					</Stack>
				</Center>
			</Box>
		</Container>
	);
}
