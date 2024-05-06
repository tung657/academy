'use client';

import { Button, CopyButton } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';

export const VerifyPwd = ({ value }: { value: string }): JSX.Element => {
	return (
		<CopyButton value={value}>
			{({ copied, copy }) => (
				<Button
					mt={16}
					color={copied ? 'teal' : 'primary'}
					onClick={copy}
					rightSection={<IconCopy stroke={1.7} size={20} />}
				>
					{copied ? 'Đã sao chép' : 'Sao chép'}{' '}
				</Button>
			)}
		</CopyButton>
	);
};
